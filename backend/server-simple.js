import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth-simple.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('🚀 FactsScan Backend Starting...');
console.log('📧 SMTP User:', process.env.SMTP_USER);
console.log('📧 SMTP Configured:', process.env.SMTP_USER && process.env.SMTP_PASS ? 'Yes ✅' : 'No ❌');

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'FactsScan API is running',
        smtp: process.env.SMTP_USER && process.env.SMTP_PASS ? 'configured' : 'not configured'
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n✅ Server running on http://localhost:${PORT}`);
    console.log(`📱 Frontend URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
    console.log(`\n⚠️  IMPORTANT: To send OTP emails, configure Gmail SMTP in .env file`);
    console.log(`   See GMAIL-SMTP-SETUP.md for instructions\n`);
});
