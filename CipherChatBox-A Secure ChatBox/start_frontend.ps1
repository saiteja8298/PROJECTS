# CipherChat Frontend Startup Script
Write-Host "🎨 Starting CipherChat Frontend..." -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ package.json not found. Please run this script from the project root directory." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Found package.json" -ForegroundColor Green

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Dependencies ready" -ForegroundColor Green

# Start the React app
Write-Host "🚀 Starting React development server..." -ForegroundColor Cyan
Write-Host "🌐 Frontend will be available at: http://localhost:3000" -ForegroundColor Green
Write-Host "🔗 Make sure the Python backend is running on port 5000" -ForegroundColor Yellow
Write-Host ""

npm start

