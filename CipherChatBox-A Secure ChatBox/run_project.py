#!/usr/bin/env python3
"""
CipherChat Complete Project Runner
Starts both Python backend and React frontend
"""

import subprocess
import sys
import os
import time
import threading
import signal

def print_banner():
    """Print project banner"""
    banner = """
    ╔══════════════════════════════════════════════════════════════╗
    ║                    🔐 CipherChat 🔐                          ║
    ║              Secure Encrypted Messaging Platform             ║
    ║                                                              ║
    ║  🎨 React Frontend + 🐍 Python Backend                     ║
    ║  🔒 Multiple Encryption Algorithms                           ║
    ║  🎯 Modern Black Theme Design                               ║
    ╚══════════════════════════════════════════════════════════════╝
    """
    print(banner)

def check_requirements():
    """Check if all requirements are met"""
    print("🔍 Checking requirements...")
    
    # Check Python
    try:
        result = subprocess.run([sys.executable, "--version"], capture_output=True, text=True)
        print(f"✅ Python: {result.stdout.strip()}")
    except:
        print("❌ Python not found")
        return False
    
    # Check Node.js
    try:
        result = subprocess.run(["node", "--version"], capture_output=True, text=True)
        print(f"✅ Node.js: {result.stdout.strip()}")
    except:
        print("❌ Node.js not found - please install from https://nodejs.org/")
        return False
    
    # Check npm
    try:
        result = subprocess.run(["npm", "--version"], capture_output=True, text=True)
        print(f"✅ npm: {result.stdout.strip()}")
    except:
        print("❌ npm not found")
        return False
    
    return True

def start_backend():
    """Start Python backend in a separate thread"""
    print("🐍 Starting Python Backend...")
    try:
        # Install Python dependencies
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "backend/requirements.txt"], 
                      check=True, cwd=os.getcwd())
        
        # Start Flask app
        os.chdir("backend")
        subprocess.run([sys.executable, "app.py"], check=True)
    except subprocess.CalledProcessError as e:
        print(f"❌ Backend failed: {e}")
    except KeyboardInterrupt:
        print("🛑 Backend stopped")

def start_frontend():
    """Start React frontend in a separate thread"""
    print("🎨 Starting React Frontend...")
    try:
        # Install npm dependencies
        subprocess.run(["npm", "install"], check=True, cwd=os.getcwd())
        
        # Start React app
        subprocess.run(["npm", "start"], check=True, cwd=os.getcwd())
    except subprocess.CalledProcessError as e:
        print(f"❌ Frontend failed: {e}")
    except KeyboardInterrupt:
        print("🛑 Frontend stopped")

def signal_handler(sig, frame):
    """Handle Ctrl+C gracefully"""
    print("\n🛑 Shutting down CipherChat...")
    sys.exit(0)

def main():
    """Main function to start both servers"""
    print_banner()
    
    # Check requirements
    if not check_requirements():
        print("❌ Requirements not met. Please install missing dependencies.")
        sys.exit(1)
    
    print("\n🚀 Starting CipherChat...")
    print("="*60)
    
    # Set up signal handler for graceful shutdown
    signal.signal(signal.SIGINT, signal_handler)
    
    # Start backend in a separate thread
    backend_thread = threading.Thread(target=start_backend, daemon=True)
    backend_thread.start()
    
    # Wait a moment for backend to start
    print("⏳ Waiting for backend to initialize...")
    time.sleep(3)
    
    # Start frontend
    try:
        start_frontend()
    except KeyboardInterrupt:
        print("\n🛑 CipherChat stopped")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()

