# 🔐 Gmail SMTP Setup - Required to Send OTP Emails

## Why You're Not Receiving Emails

The backend is built and ready, but **you need to configure Gmail SMTP** to send emails. Without this, OTPs cannot be sent.

---

## ⚡ Quick Setup (5 Minutes)

### Step 1: Enable 2-Step Verification on Gmail

1. Open: https://myaccount.google.com/security
2. Find "2-Step Verification"
3. Click "Get Started" and follow the prompts
4. ✅ Complete 2-Step Verification setup

### Step 2: Generate Gmail App Password

1. Open: https://myaccount.google.com/apppasswords
2. You'll see "App passwords" section
3. Select **"Mail"** from the "Select app" dropdown
4. Select **"Other (Custom name)"** from "Select device"
5. Type: **FactsScan**
6. Click **"Generate"**
7. You'll see a 16-character password like: `abcd efgh ijkl mnop`
8. **COPY THIS PASSWORD** (remove spaces: `abcdefghijklmnop`)

### Step 3: Configure Backend .env File

1. Open `backend/.env` file (create it from `backend/.env.example` if it doesn't exist)

   ```bash
   # From project root
   cd backend
   copy .env.example .env    # Windows
   # OR
   cp .env.example .env      # Mac/Linux
   ```

2. Edit the `.env` file and add your Gmail credentials:

   ```env
   # Gmail SMTP Configuration
   SMTP_USER=your.email@gmail.com
   SMTP_PASS=abcdefghijklmnop    # Your 16-char app password (NO spaces)
   
   # MongoDB - You can use Atlas or local
   MONGODB_URI=mongodb://localhost:27017/factsscan
   
   # Other settings
   PORT=5000
   CLIENT_URL=http://localhost:5173
   JWT_SECRET=your-secret-key-change-this-in-production
   ```

3. **Save the file**

---

## 🚀 Start Backend Server

```bash
# Navigate to backend folder
cd backend

#Install dependencies (if not already done)
npm install

# Start the server
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
📧 SMTP configured: Yes  ← This confirms Gmail is configured!
```

---

## 🧪 Test It!

1. Keep backend running in one terminal
2. Start frontend in another terminal:
   ```bash
   npm run dev
   ```

3. Go to http://localhost:5173/signup
4. Fill the form with your **real email**
5. Click "Sign Up"
6. **Check your email inbox** - You should receive OTP within seconds!
7. Enter the OTP on the verification page
8. ✅ Success - You're logged in!

---

## ⚠️ Troubleshooting

### Issue: "Failed to send OTP email"

**Solutions:**
- Verify 2-Step Verification is enabled on Gmail
- Make sure you created an **App Password** (not your regular Gmail password)
- Check SMTP_USER is your full Gmail address
- Check SMTP_PASS is the 16-character app password **without spaces**
- Try logging into Gmail on web to ensure account is active

### Issue: "SMTP configured: No"

**Solution:**
- Check `backend/.env` file exists
- Verify SMTP_USER and SMTP_PASS are set correctly
- Restart backend server after updating .env

### Issue: "MongoDB connection error"

**Quick Fix - Use MongoDB Atlas (Free Cloud)**:
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create free cluster
4. Get connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/factsscan`)
5. Update MONGODB_URI in `.env`

**OR Local MongoDB**:
1. Download from https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Use: `MONGODB_URI=mongodb://localhost:27017/factsscan`

### Issue: Email goes to Spam

**Solution:**
- Check Spam/Junk folder
- Mark as "Not Spam"
- Gmail SMTP is trusted, so this is rare

---

## 📧 What the Email Looks Like

You'll receive a professional email with:
- ✅ **FactsScan branding** (gradient purple/pink)
- ✅ **Large 6-digit OTP code**
- ✅ **5-minute validity warning**
- ✅ **Security tips**
- ✅ **Professional footer**

---

## 🔒 Security

- ✅ OTPs are **hashed** before storage (bcrypt)
- ✅ OTPs **expire after 5 minutes** (auto-deleted)
- ✅ **Max 5 verification attempts**
- ✅ Passwords hashed with **bcrypt** (12 rounds)
- ✅ **Rate limiting** prevents abuse
- ✅ **JWT tokens** for authentication

---

## ✅ Summary

**What you need:**
1. Gmail account with 2-Step Verification
2. Gmail App Password (16 characters)
3. MongoDB (Atlas or local)
4. Backend `.env` configured
5. Backend server running

**Then:**
- Signup works with **real OTP emails**
- Login works with **JWT authentication**
- Forgot Password works with **real OTP emails**
- No more development OTP alerts ✅

---

## 🎯 Files Updated

### Backend (Complete - No changes needed):
- ✅ `backend/server.js` - Express server
- ✅ `backend/models/User.js` - User model with bcrypt
- ✅ `backend/models/OTP.js` - OTP model with TTL
- ✅ `backend/routes/auth.js` - All auth endpoints
- ✅ `backend/services/emailService.js` - Gmail SMTP integration
- ✅ `backend/middleware/rateLimiter.js` - Rate limiting
- ✅ `backend/utils/validation.js` - Input validation
- ✅ `backend/package.json` - Dependencies installed

### Frontend (Updated to use backend):
- ✅ `src/services/authService.js` - Backend API connector
- ✅ `src/context/AuthContext.jsx` - Uses authService
- ✅ `src/pages/Signup.jsx` - Calls backend API
- ✅ `src/pages/OTPVerification.jsx` - Calls backend API
- ✅ `src/pages/Login.jsx` - (Will be updated next)
- ✅ `src/pages/ForgotPassword.jsx` - (Will be updated next)

---

**Status**: ⏳ Waiting for Gmail SMTP configuration

**Next Step**: Configure `.env` file with Gmail credentials, start backend, test signup!

---

*Setup Guide - February 3, 2026*
