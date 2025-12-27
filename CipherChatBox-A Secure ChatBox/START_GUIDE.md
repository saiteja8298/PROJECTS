# 🚀 CipherChat Startup Guide

## ✅ **Current Status:**
- **Python Backend**: ✅ Running on http://localhost:5000
- **React Frontend**: ⏳ Ready to start

## 🎯 **To Start the Frontend:**

### **Option 1: Use the Simple Batch File (Recommended)**
```bash
# Double-click this file:
start_frontend_simple.bat
```

### **Option 2: Use PowerShell Script**
```powershell
# Right-click and "Run with PowerShell":
start_frontend.ps1
```

### **Option 3: Manual Command**
Open **Command Prompt** and run:
```bash
cd "C:\TEJ FILES\CACD PRO2"
npm start
```

## 🔍 **Troubleshooting:**

### If you get "package.json not found" error:
1. Make sure you're in the correct directory: `C:\TEJ FILES\CACD PRO2`
2. Check that `package.json` exists in the directory
3. Use the batch file: `start_frontend_simple.bat`

### If npm start doesn't work:
1. Try: `npx react-scripts start`
2. Or: `npm run start`
3. Check that Node.js is installed: `node --version`

### If port 3000 is busy:
1. Find what's using it: `netstat -an | findstr :3000`
2. Kill the process or use different port: `set PORT=3001 && npm start`

## 🌐 **Once Both Are Running:**

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 🎉 **Success Indicators:**

### Backend (Already Running):
```
🔐 CipherChat Backend Starting...
🌐 Backend running on http://localhost:5000
```

### Frontend (When Started):
```
webpack compiled successfully
Local:            http://localhost:3000
On Your Network:  http://192.168.x.x:3000
```

## 🔐 **What You Can Do:**

1. **Open browser** → http://localhost:3000
2. **Create account** or login
3. **Choose encryption algorithm** (AES, DES, TripleDES, RC4, Blowfish)
4. **Set encryption key**
5. **Start secure messaging!**

## 📱 **Features:**
- **Modern Black Theme** - Professional dark design
- **Real-time Encryption** - Messages encrypted before transmission
- **Multiple Ciphers** - Choose your preferred algorithm
- **Responsive Design** - Works on all devices
- **Secure Authentication** - JWT-based login system

---

**💡 Pro Tip:** Use `start_frontend_simple.bat` for the easiest startup!

