@echo off
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                    🔐 CipherChat 🔐                          ║
echo ║              Secure Encrypted Messaging Platform             ║
echo ║                                                              ║
echo ║  🎨 React Frontend + 🐍 Python Backend                     ║
echo ║  🔒 Multiple Encryption Algorithms                           ║
echo ║  🎯 Modern Black Theme Design                               ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo 🔍 Checking requirements...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python not found. Please install Python 3.7+
    pause
    exit /b 1
)
echo ✅ Python found

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js 14+
    pause
    exit /b 1
)
echo ✅ Node.js found

npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm not found. Please install npm
    pause
    exit /b 1
)
echo ✅ npm found

echo.
echo 🚀 Starting CipherChat...
echo.

echo 📦 Installing Python dependencies...
pip install -r backend/requirements.txt >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Failed to install Python dependencies
    pause
    exit /b 1
)
echo ✅ Python dependencies installed

echo.
echo 🐍 Starting Python Backend...
start "CipherChat Backend" cmd /k "cd backend && python app.py"

echo ⏳ Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo.
echo 🎨 Starting React Frontend...
start "CipherChat Frontend" cmd /k "npm start"

echo.
echo 🎉 CipherChat is starting up!
echo.
echo 🌐 Frontend: http://localhost:3000
echo 🔗 Backend: http://localhost:5000
echo.
echo Press any key to exit...
pause >nul

