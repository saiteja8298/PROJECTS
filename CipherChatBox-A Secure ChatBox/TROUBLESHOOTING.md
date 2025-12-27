# 🔧 CipherChat Troubleshooting Guide

## 🚨 Common Issues and Solutions

### 1. React Frontend Issues

#### Issue: `Cannot find module 'fork-ts-checker-webpack-plugin'`
**Solution:**
```bash
# Clean install
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### Issue: Missing dependencies or corrupted node_modules
**Solution:**
```bash
# Windows
rmdir /s node_modules
del package-lock.json
npm install

# Linux/Mac
rm -rf node_modules package-lock.json
npm install
```

#### Issue: Port 3000 already in use
**Solution:**
```bash
# Find and kill process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Or use a different port
set PORT=3001 && npm start
```

### 2. Python Backend Issues

#### Issue: Module not found errors
**Solution:**
```bash
# Install dependencies
pip install -r backend/requirements.txt

# Or install individually
pip install Flask Flask-CORS cryptography PyJWT python-dotenv gunicorn
```

#### Issue: Port 5000 already in use
**Solution:**
```bash
# Find and kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Or change port in backend/app.py
app.run(debug=True, host='0.0.0.0', port=5001)
```

### 3. CORS Issues

#### Issue: Frontend can't connect to backend
**Solution:**
1. Make sure backend is running on port 5000
2. Check that CORS is enabled in backend/app.py
3. Verify API endpoints are accessible

### 4. Windows-Specific Issues

#### Issue: PowerShell execution policy
**Solution:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Issue: Path issues with spaces
**Solution:**
Use the batch file: `start_cipherchat.bat`

### 5. Node.js Version Issues

#### Issue: Incompatible Node.js version
**Solution:**
- Install Node.js 14+ from https://nodejs.org/
- Use nvm to manage Node.js versions

### 6. Python Version Issues

#### Issue: Python version too old
**Solution:**
- Install Python 3.7+ from https://python.org/
- Use pyenv to manage Python versions

## 🚀 Quick Fixes

### Complete Reset (Windows)
```batch
@echo off
echo 🔄 Resetting CipherChat...

echo Cleaning React dependencies...
rmdir /s /q node_modules
del package-lock.json

echo Cleaning Python dependencies...
pip uninstall -y Flask Flask-CORS cryptography PyJWT python-dotenv gunicorn

echo Reinstalling everything...
npm install
pip install -r backend/requirements.txt

echo ✅ Reset complete!
```

### Complete Reset (Linux/Mac)
```bash
#!/bin/bash
echo "🔄 Resetting CipherChat..."

echo "Cleaning React dependencies..."
rm -rf node_modules package-lock.json

echo "Cleaning Python dependencies..."
pip uninstall -y Flask Flask-CORS cryptography PyJWT python-dotenv gunicorn

echo "Reinstalling everything..."
npm install
pip install -r backend/requirements.txt

echo "✅ Reset complete!"
```

## 🔍 Diagnostic Commands

### Check if ports are available
```bash
# Windows
netstat -an | findstr :3000
netstat -an | findstr :5000

# Linux/Mac
lsof -i :3000
lsof -i :5000
```

### Check Node.js and npm versions
```bash
node --version
npm --version
```

### Check Python version
```bash
python --version
pip --version
```

### Test backend API
```bash
curl http://localhost:5000/api/health
```

### Test frontend
```bash
curl http://localhost:3000
```

## 🛠️ Manual Setup Steps

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### 2. Frontend Setup
```bash
npm install
npm start
```

### 3. Test Both
- Backend: http://localhost:5000/api/health
- Frontend: http://localhost:3000

## 📞 Getting Help

### Check Logs
- Backend logs: Check terminal where you ran `python app.py`
- Frontend logs: Check terminal where you ran `npm start`
- Browser console: F12 → Console tab

### Common Error Messages

#### `MODULE_NOT_FOUND`
- Run `npm install` to install missing dependencies

#### `EADDRINUSE`
- Port is already in use, kill the process or use different port

#### `CORS error`
- Backend not running or CORS not configured

#### `Cannot resolve module`
- Missing dependency, run `npm install`

### Environment Issues

#### Windows
- Use Command Prompt or PowerShell as Administrator
- Check Windows Defender/antivirus blocking ports
- Ensure Python and Node.js are in PATH

#### Linux/Mac
- Use `sudo` if needed for global installations
- Check firewall settings
- Ensure proper permissions

## 🎯 Success Indicators

### Backend Running Successfully
```
🔐 CipherChat Backend Starting...
🌐 Backend running on http://localhost:5000
🔗 CORS enabled for React frontend
```

### Frontend Running Successfully
```
webpack compiled successfully
Local:            http://localhost:3000
On Your Network:  http://192.168.x.x:3000
```

### Full Application Working
1. Backend responds to health check
2. Frontend loads without errors
3. Can register/login users
4. Can encrypt/decrypt messages
5. All UI components render properly

## 🔧 Advanced Troubleshooting

### If nothing works
1. Restart your computer
2. Update Node.js and Python to latest versions
3. Run as Administrator (Windows)
4. Check antivirus/firewall settings
5. Try different ports
6. Use the batch file: `start_cipherchat.bat`

### Performance Issues
- Close other applications using ports 3000/5000
- Increase Node.js memory: `set NODE_OPTIONS=--max-old-space-size=4096`
- Use production build: `npm run build`

---

**💡 Pro Tip:** Use the batch file `start_cipherchat.bat` for the easiest setup on Windows!

