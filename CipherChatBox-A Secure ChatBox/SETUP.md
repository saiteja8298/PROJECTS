# 🔐 CipherChat - Complete Setup Guide

## 🎯 Project Overview

CipherChat is a secure encrypted messaging platform built with:
- **Frontend**: React.js with modern black theme
- **Backend**: Python Flask with multiple encryption algorithms
- **Encryption**: AES, DES, TripleDES, RC4, Blowfish

## 📋 Prerequisites

### Required Software
1. **Python 3.7+** - [Download here](https://python.org/downloads/)
2. **Node.js 14+** - [Download here](https://nodejs.org/)
3. **npm** - Comes with Node.js

### Verify Installation
```bash
python --version    # Should show Python 3.7+
node --version      # Should show Node.js 14+
npm --version       # Should show npm version
```

## 🚀 Quick Start (Recommended)

### Option 1: Run Everything at Once
```bash
# Make the script executable (Linux/Mac)
chmod +x run_project.py

# Run the complete project
python run_project.py
```

This will:
- ✅ Check all requirements
- ✅ Install Python dependencies
- ✅ Install React dependencies
- ✅ Start Python backend (port 5000)
- ✅ Start React frontend (port 3000)

### Option 2: Run Separately

#### Start Python Backend
```bash
# Terminal 1 - Backend
python start_backend.py
```

#### Start React Frontend
```bash
# Terminal 2 - Frontend
python start_frontend.py
```

## 🛠️ Manual Setup

### 1. Backend Setup (Python)
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start Flask server
python app.py
```

**Backend will run on:** http://localhost:5000

### 2. Frontend Setup (React)
```bash
# Install React dependencies
npm install

# Start React development server
npm start
```

**Frontend will run on:** http://localhost:3000

## 🔧 Project Structure

```
CipherChat/
├── backend/
│   ├── app.py              # Python Flask server
│   └── requirements.txt    # Python dependencies
├── src/
│   ├── components/         # React components
│   ├── services/           # API services
│   └── utils/              # Utility functions
├── public/                 # Static files
├── package.json           # React dependencies
├── start_backend.py       # Backend startup script
├── start_frontend.py      # Frontend startup script
├── run_project.py         # Complete project runner
└── README.md              # Project documentation
```

## 🔐 Encryption Features

### Supported Algorithms
1. **AES** - Advanced Encryption Standard (128/192/256 bits)
2. **DES** - Data Encryption Standard (56 bits)
3. **TripleDES** - Triple Data Encryption Standard (112/168 bits)
4. **RC4** - Rivest Cipher 4 (40-2048 bits)
5. **Blowfish** - Blowfish Encryption (32-448 bits)

### API Endpoints
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/encrypt` - Encrypt message
- `POST /api/decrypt` - Decrypt message
- `GET /api/ciphers` - Get available ciphers
- `POST /api/generate-key` - Generate encryption key
- `GET /api/health` - Health check

## 🎨 Frontend Features

### UI Components
- **Landing Page** - Hero section with features
- **Authentication** - Login/Register forms
- **Chat Interface** - Real-time messaging
- **Settings Panel** - Configuration options

### Design Features
- **Black Theme** - Professional dark design
- **Responsive** - Works on all devices
- **Animations** - Smooth transitions
- **Modern UI** - Glassmorphism effects

## 🔒 Security Features

### Encryption
- **Client-side Encryption** - Messages encrypted before transmission
- **Multiple Ciphers** - Choose your preferred algorithm
- **Custom Keys** - User-controlled encryption keys
- **Zero-Knowledge** - No server-side message storage

### Authentication
- **JWT Tokens** - Secure session management
- **Password Hashing** - SHA-256 password protection
- **Session Persistence** - Local storage integration

## 🚨 Troubleshooting

### Common Issues

#### 1. Python Backend Issues
```bash
# Check Python version
python --version

# Install dependencies manually
pip install Flask Flask-CORS cryptography PyJWT

# Check if port 5000 is available
netstat -an | grep 5000
```

#### 2. React Frontend Issues
```bash
# Check Node.js version
node --version

# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 3. Port Conflicts
```bash
# Check what's using port 3000
lsof -i :3000

# Check what's using port 5000
lsof -i :5000

# Kill processes if needed
kill -9 <PID>
```

#### 4. CORS Issues
- Backend has CORS enabled for React frontend
- Make sure backend is running on port 5000
- Check browser console for errors

### Error Messages

#### "Module not found"
```bash
# Install missing dependencies
pip install <module-name>
npm install <package-name>
```

#### "Port already in use"
```bash
# Find and kill process using the port
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

#### "Permission denied"
```bash
# Make scripts executable
chmod +x run_project.py
chmod +x start_backend.py
chmod +x start_frontend.py
```

## 📱 Usage Guide

### 1. First Time Setup
1. Run the project: `python run_project.py`
2. Open browser: http://localhost:3000
3. Create an account
4. Set up encryption key
5. Start messaging!

### 2. Using the App
1. **Register/Login** - Create account or sign in
2. **Choose Cipher** - Select encryption algorithm
3. **Set Key** - Enter or generate encryption key
4. **Send Messages** - Type and send encrypted messages
5. **Settings** - Configure preferences

### 3. Encryption Process
1. Type your message
2. Choose encryption algorithm
3. Enter encryption key
4. Message is encrypted client-side
5. Encrypted message is sent
6. Recipient decrypts with same key

## 🔧 Development

### Backend Development
```bash
cd backend
python app.py
```

### Frontend Development
```bash
npm start
```

### Adding New Features
1. Backend: Add endpoints in `backend/app.py`
2. Frontend: Add components in `src/components/`
3. API: Update `src/services/api.js`

## 📊 Performance

### Backend Performance
- **Flask** - Lightweight Python web framework
- **Cryptography** - Industry-standard encryption
- **JWT** - Fast token-based authentication

### Frontend Performance
- **React 18** - Latest React with optimizations
- **Framer Motion** - Hardware-accelerated animations
- **Lazy Loading** - Optimized component loading

## 🛡️ Security Best Practices

### For Production
1. **Use HTTPS** - Encrypt all communications
2. **Environment Variables** - Store secrets securely
3. **Database** - Use proper database instead of in-memory
4. **Rate Limiting** - Prevent abuse
5. **Input Validation** - Sanitize all inputs

### For Development
1. **Never commit secrets** - Use .env files
2. **Test encryption** - Verify all algorithms work
3. **Validate inputs** - Check all user inputs
4. **Error handling** - Handle all edge cases

## 📞 Support

### Getting Help
1. Check this setup guide
2. Review error messages
3. Check browser console
4. Verify all requirements

### Common Commands
```bash
# Check if servers are running
curl http://localhost:5000/api/health
curl http://localhost:3000

# View logs
python app.py  # Backend logs
npm start      # Frontend logs
```

---

**🎉 Enjoy your secure messaging with CipherChat!**

*Built with ❤️ using React.js and Python*

