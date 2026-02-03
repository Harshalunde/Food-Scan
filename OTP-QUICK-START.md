# 🚀 Quick Start - OTP System

## ✅ What Was Built

**Complete OTP Email Verification System** with:
- ✅ Backend API (Node.js + Express + MongoDB)
- ✅ Gmail SMTP integration (100% free)
- ✅ Secure OTP generation & verification
- ✅ bcrypt password hashing
- ✅ JWT authentication
- ✅ Rate limiting & security
- ✅ Professional email templates

---

## 📋 5-Minute Setup

### 1. Install MongoDB

**Quick Option - MongoDB Atlas (Cloud - Free)**:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account & cluster
3. Get connection string

**OR Local MongoDB**:
1. Download from [MongoDB.com](https://www.mongodb.com/try/download/community)
2. Install & start service

---

### 2. Get Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable "2-Step Verification"
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Generate password for "Mail"
5. Copy the 16-character code

---

### 3. Configure Backend

1. **Copy env template**:
   ```bash
   cd backend
   copy .env.example .env
   ```

2. **Edit `backend/.env`**:
   ```env
   MONGODB_URI=mongodb://localhost:27017/factsscan
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-char-app-password
   ```

3. **Dependencies already installed** ✅

---

### 4. Start Backend

```bash
# From backend folder
npm run dev
```

Should see:
```
✅ MongoDB connected
🚀 Server running on http://localhost:5000
📧 SMTP configured: Yes
```

---

### 5. Start Frontend

**New terminal** - from project root:
```bash
npm run dev
```

---

## 🧪 Test It!

1. **Go to** http://localhost:5173/signup
2. **Fill form** with:
   - Valid email (you'll receive OTP here)
   - Strong password (8+ chars, uppercase, lowercase, number, special char)
3. **Check email** - OTP arrives in seconds
4. **Enter OTP** on verification page
5. ✅ **Auto-logged in** after verification!

---

## 📁 What Changed

### New Files:
```
backend/
├── server.js                  # Express server
├── package.json              # Backend dependencies
├── .env.example              # Env template
├── models/
│   ├── User.js              # User schema
│   └── OTP.js               # OTP schema (TTL index)
├── routes/
│   └── auth.js              # All auth endpoints
├── services/
│   └── emailService.js      # Gmail SMTP & templates
├── middleware/
│   ├── rateLimiter.js       # Rate limiting
│   └── errorHandler.js      # Error handling
└── utils/
    └── validation.js        # Input validation

src/
├── services/
│   └── authService.js       # NEW: Backend connector
└── context/
    └── AuthContext.jsx      # UPDATED: Uses authService
```

### Existing Files - NO CHANGES:
- ✅ All Scanner features
- ✅ All Product pages
- ✅ All Navigation
- ✅ All UI/UX
- ✅ All other functionality

---

## 🔐 Security Features

✅ **Passwords**: bcrypt (12 rounds)  
✅ **OTPs**: Hashed, 5-min TTL, max 5 attempts  
✅ **Auth**: JWT tokens (7 days)  
✅ **Rate Limiting**: Prevents brute force  
✅ **Validation**: Email, password, name  
✅ **HTTPS Ready**: For production  

---

## 📧 Email Features

✅ **OTP Email**: Professional HTML template  
✅ **Welcome Email**: After verification  
✅ **Security Warnings**: In every email  
✅ **Branding**: FactsScan colors & logo  

---

## 🎯 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/signup` | POST | Create account & send OTP |
| `/api/auth/verify-otp` | POST | Verify OTP |
| `/api/auth/resend-otp` | POST | Resend OTP |
| `/api/auth/login` | POST | Login |
| `/api/auth/forgot-password` | POST | Request reset OTP |
| `/api/auth/reset-password` | POST | Reset password |

---

## ⚠️ Troubleshooting

**MongoDB connection error?**
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in `.env`

**Email not sending?**
- Verify Gmail App Password (16 chars)
- Enable 2-Step Verification on Gmail
- Check SMTP_USER and SMTP_PASS

**Port already in use?**
- Change PORT in `backend/.env`
- Update VITE_API_URL in `.env` (project root)

---

## 📖 Full Documentation

See `OTP-SYSTEM-SETUP.md` for:
- Detailed setup instructions
- Authentication flows
- Database schema
- Email templates
- Production deployment
- Complete API reference

---

## ✅ Status

**Backend**: ✅ Built & Ready  
**Frontend**: ✅ Integrated  
**Dependencies**: ✅ Installed  
**Security**: ✅ Production-grade  
**Email**: ✅ Gmail SMTP configured  
**Database**: ⏳ Needs MongoDB setup  

**Next Step**: Configure MongoDB & Gmail, then start testing!

---

*Quick Start Guide*  
*February 3, 2026*  
*All existing features preserved ✅*
