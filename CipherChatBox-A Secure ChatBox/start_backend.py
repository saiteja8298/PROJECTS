#!/usr/bin/env python3
"""
CipherChat Backend Startup Script
Starts the Python Flask backend server
"""

import subprocess
import sys
import os
import time

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 7):
        print("❌ Python 3.7 or higher is required")
        print(f"Current version: {sys.version}")
        sys.exit(1)
    print(f"✅ Python version: {sys.version}")

def install_requirements():
    """Install Python requirements"""
    print("📦 Installing Python dependencies...")
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "backend/requirements.txt"], 
                      check=True, cwd=os.getcwd())
        print("✅ Dependencies installed successfully")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        sys.exit(1)

def start_backend():
    """Start the Flask backend server"""
    print("🚀 Starting CipherChat Backend...")
    print("🔐 Available encryption algorithms:")
    print("   • AES (Advanced Encryption Standard)")
    print("   • DES (Data Encryption Standard)")
    print("   • TripleDES (Triple Data Encryption Standard)")
    print("   • RC4 (Rivest Cipher 4)")
    print("   • Blowfish (Blowfish Encryption)")
    print("\n🌐 Backend will be available at: http://localhost:5000")
    print("🔗 API endpoints:")
    print("   POST /api/register - User registration")
    print("   POST /api/login - User login")
    print("   POST /api/encrypt - Encrypt message")
    print("   POST /api/decrypt - Decrypt message")
    print("   GET  /api/ciphers - Get available ciphers")
    print("   POST /api/generate-key - Generate encryption key")
    print("   GET  /api/health - Health check")
    print("\n" + "="*60)
    
    try:
        # Change to backend directory and start Flask app
        os.chdir("backend")
        subprocess.run([sys.executable, "app.py"], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Backend server stopped")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to start backend: {e}")
        sys.exit(1)

if __name__ == "__main__":
    print("🔐 CipherChat Backend Startup")
    print("="*60)
    
    check_python_version()
    install_requirements()
    start_backend()

