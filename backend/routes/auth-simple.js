import express from 'express';
import crypto from 'crypto';
import { sendOTPEmail, generateOTP } from '../services/emailService.js';

const router = express.Router();

// In-memory storage (temporary - works without MongoDB)
// In production, these would be your Mongoose models
const users = new Map();
const otps = new Map();

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const emailLower = email.toLowerCase();

        // Check if user exists and verified
        if (users.has(emailLower) && users.get(emailLower).isVerified) {
            return res.status(400).json({ message: 'Email already registered. Please login.' });
        }

        // Store user (not verified yet)
        if (!users.has(emailLower)) {
            users.set(emailLower, {
                firstName,
                lastName,
                email: emailLower,
                password, // In production, hash this!
                isVerified: false
            });
        } else {
            // Update existing unverified user
            const existing = users.get(emailLower);
            users.set(emailLower, { ...existing, firstName, lastName, password });
        }

        // Generate and store OTP
        const otp = generateOTP();
        otps.set(emailLower, {
            otp,
            type: 'signup',
            expiresAt: Date.now() + 5 * 60 * 1000,
            attempts: 0
        });

        // Send Email
        await sendOTPEmail(emailLower, otp, 'signup');

        res.status(201).json({
            message: 'OTP sent to your email. Please verify to complete registration.',
            email: emailLower
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
});

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp, type } = req.body;
        const emailLower = email.toLowerCase();
        const otpData = otps.get(emailLower);

        // Validation logic
        if (!otpData || otpData.type !== type) {
            return res.status(400).json({ message: 'No OTP found. Please request a new one.' });
        }
        if (Date.now() > otpData.expiresAt) {
            otps.delete(emailLower);
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }
        if (otpData.otp !== otp.trim()) {
            otpData.attempts++;
            if (otpData.attempts >= 5) {
                otps.delete(emailLower);
                return res.status(400).json({ message: 'Too many attempts. Request a new OTP.' });
            }
            return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
        }

        // OTP Verified
        otps.delete(emailLower);

        if (type === 'signup') {
            const user = users.get(emailLower);
            if (!user) return res.status(404).json({ message: 'User not found' });

            user.isVerified = true;
            users.set(emailLower, user); // Update user status

            // Login token
            const token = Buffer.from(JSON.stringify({ email: emailLower })).toString('base64');
            res.json({
                success: true,
                message: 'Email verified successfully!',
                token,
                user: { ...user, password: undefined }
            });
        } else {
            // Checkpoint for forgot-password (verified but not yet reset)
            res.json({ success: true, message: 'OTP Verified' });
        }
    } catch (error) {
        console.error('Verify error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/auth/resend-otp
router.post('/resend-otp', async (req, res) => {
    try {
        const { email, type } = req.body;
        const emailLower = email.toLowerCase();

        if (type === 'forgot-password' && !users.has(emailLower)) {
            return res.status(404).json({ message: 'No account found with this email' });
        }

        const otp = generateOTP();
        otps.set(emailLower, {
            otp,
            type,
            expiresAt: Date.now() + 5 * 60 * 1000,
            attempts: 0
        });

        await sendOTPEmail(emailLower, otp, type);
        res.json({ success: true, message: 'New OTP sent' });
    } catch (error) {
        console.error('Resend error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailLower = email.toLowerCase();
        const user = users.get(emailLower);

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        if (!user.isVerified) {
            return res.status(403).json({ message: 'Email not verified', needsVerification: true });
        }

        const token = Buffer.from(JSON.stringify({ email: emailLower })).toString('base64');
        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: { ...user, password: undefined }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const emailLower = email.toLowerCase();

        if (!users.has(emailLower)) {
            // Security: Don't reveal if user exists. 
            // In a real app we'd simulate a delay or send a fake success.
            // For now, let's be honest for dev experience.
            return res.status(404).json({ message: 'No account found with this email' });
        }

        const otp = generateOTP();
        otps.set(emailLower, {
            otp,
            type: 'forgot-password',
            expiresAt: Date.now() + 5 * 60 * 1000,
            attempts: 0
        });

        await sendOTPEmail(emailLower, otp, 'forgot-password');
        res.json({ success: true, message: 'Password reset OTP sent to your email' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailLower = email.toLowerCase();

        if (!users.has(emailLower)) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update password
        const user = users.get(emailLower);
        user.password = password;
        users.set(emailLower, user);

        // Clear any OTPs
        otps.delete(emailLower);

        // Send confirmation/login token automatically? 
        // Or just success and make them login. Let's make them login for security.
        res.json({ success: true, message: 'Password reset successfully. Please login with your new password.' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
