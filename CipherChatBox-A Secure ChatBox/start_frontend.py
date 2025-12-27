#!/usr/bin/env python3
"""
CipherChat Frontend Startup Script
Starts the React frontend development server
"""

import subprocess
import sys
import os
import time

def check_node_version():
    """Check if Node.js is installed and version is compatible"""
    try:
        result = subprocess.run(["node", "--version"], capture_output=True, text=True, check=True)
        version = result.stdout.strip()
        print(f"✅ Node.js version: {version}")
        
        # Extract major version number
        major_version = int(version[1:].split('.')[0])
        if major_version < 14:
            print("⚠️  Node.js 14 or higher is recommended")
    except FileNotFoundError:
        print("❌ Node.js is not installed")
        print("Please install Node.js from: https://nodejs.org/")
        sys.exit(1)
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to check Node.js version: {e}")
        sys.exit(1)

def install_dependencies():
    """Install npm dependencies"""
    print("📦 Installing React dependencies...")
    try:
        subprocess.run(["npm", "install"], check=True, cwd=os.getcwd())
        print("✅ Dependencies installed successfully")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        print("Make sure you have npm installed and run: npm install")
        sys.exit(1)

def start_frontend():
    """Start the React development server"""
    print("🚀 Starting CipherChat Frontend...")
    print("🎨 Features:")
    print("   • Modern React 18 with hooks")
    print("   • Stylish black theme design")
    print("   • Multiple encryption algorithms")
    print("   • Real-time messaging interface")
    print("   • Responsive design for all devices")
    print("\n🌐 Frontend will be available at: http://localhost:3000")
    print("🔗 Make sure the Python backend is running on port 5000")
    print("\n" + "="*60)
    
    try:
        subprocess.run(["npm", "start"], check=True, cwd=os.getcwd())
    except KeyboardInterrupt:
        print("\n🛑 Frontend server stopped")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to start frontend: {e}")
        print("Try running: npm start")
        sys.exit(1)

if __name__ == "__main__":
    print("🎨 CipherChat Frontend Startup")
    print("="*60)
    
    check_node_version()
    install_dependencies()
    start_frontend()

