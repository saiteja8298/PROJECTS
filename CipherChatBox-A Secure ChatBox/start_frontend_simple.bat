@echo off
echo.
echo 🎨 Starting CipherChat Frontend...
echo =================================

cd /d "C:\TEJ FILES\CACD PRO2"

if not exist package.json (
    echo ❌ package.json not found. Please check the directory.
    pause
    exit /b 1
)

echo ✅ Found package.json

if not exist node_modules (
    echo 📦 Installing dependencies...
    npm install
    if errorlevel 1 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
)

echo ✅ Dependencies ready
echo.
echo 🚀 Starting React development server...
echo 🌐 Frontend will be available at: http://localhost:3000
echo 🔗 Make sure the Python backend is running on port 5000
echo.

npm start

