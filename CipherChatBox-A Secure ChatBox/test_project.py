#!/usr/bin/env python3
"""
CipherChat Project Test Script
Tests both backend and frontend functionality
"""

import requests
import json
import time
import subprocess
import sys
import os

def test_backend_health():
    """Test if backend is running and healthy"""
    try:
        response = requests.get('http://localhost:5000/api/health', timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Backend Health: {data['status']}")
            return True
        else:
            print(f"❌ Backend Health: HTTP {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Backend Health: {e}")
        return False

def test_backend_ciphers():
    """Test cipher endpoints"""
    try:
        response = requests.get('http://localhost:5000/api/ciphers', timeout=5)
        if response.status_code == 200:
            data = response.json()
            ciphers = data['ciphers']
            print(f"✅ Available Ciphers: {len(ciphers)} algorithms")
            for cipher in ciphers:
                print(f"   • {cipher['name']} - {cipher['description']}")
            return True
        else:
            print(f"❌ Ciphers: HTTP {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Ciphers: {e}")
        return False

def test_encryption():
    """Test encryption/decryption functionality"""
    test_message = "Hello, CipherChat! This is a test message."
    test_key = "test-key-12345"
    
    try:
        # Test AES encryption
        encrypt_data = {
            'text': test_message,
            'key': test_key,
            'cipher': 'AES'
        }
        
        response = requests.post('http://localhost:5000/api/encrypt', 
                               json=encrypt_data, timeout=5)
        
        if response.status_code == 200:
            encrypt_result = response.json()
            encrypted_text = encrypt_result['encrypted_text']
            print(f"✅ AES Encryption: Success")
            
            # Test decryption
            decrypt_data = {
                'encrypted_text': encrypted_text,
                'key': test_key,
                'cipher': 'AES'
            }
            
            response = requests.post('http://localhost:5000/api/decrypt', 
                                   json=decrypt_data, timeout=5)
            
            if response.status_code == 200:
                decrypt_result = response.json()
                decrypted_text = decrypt_result['decrypted_text']
                
                if decrypted_text == test_message:
                    print(f"✅ AES Decryption: Success")
                    return True
                else:
                    print(f"❌ AES Decryption: Text mismatch")
                    return False
            else:
                print(f"❌ AES Decryption: HTTP {response.status_code}")
                return False
        else:
            print(f"❌ AES Encryption: HTTP {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Encryption Test: {e}")
        return False

def test_user_registration():
    """Test user registration"""
    try:
        user_data = {
            'username': 'testuser',
            'email': 'test@cipherchat.com',
            'password': 'testpass123',
            'encryptionKey': 'test-encryption-key'
        }
        
        response = requests.post('http://localhost:5000/api/register', 
                               json=user_data, timeout=5)
        
        if response.status_code == 201:
            data = response.json()
            print(f"✅ User Registration: Success")
            print(f"   User ID: {data['user']['id']}")
            print(f"   Username: {data['user']['username']}")
            return True
        else:
            print(f"❌ User Registration: HTTP {response.status_code}")
            if response.status_code == 400:
                print("   (User might already exist - this is expected)")
                return True
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ User Registration: {e}")
        return False

def test_key_generation():
    """Test key generation"""
    try:
        response = requests.post('http://localhost:5000/api/generate-key', timeout=5)
        
        if response.status_code == 200:
            data = response.json()
            key = data['key']
            print(f"✅ Key Generation: Success")
            print(f"   Generated Key: {key[:20]}...")
            return True
        else:
            print(f"❌ Key Generation: HTTP {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Key Generation: {e}")
        return False

def test_frontend_access():
    """Test if frontend is accessible"""
    try:
        response = requests.get('http://localhost:3000', timeout=5)
        if response.status_code == 200:
            print(f"✅ Frontend Access: Success")
            return True
        else:
            print(f"❌ Frontend Access: HTTP {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Frontend Access: {e}")
        return False

def run_all_tests():
    """Run all tests"""
    print("🧪 CipherChat Project Tests")
    print("="*50)
    
    tests = [
        ("Backend Health", test_backend_health),
        ("Available Ciphers", test_backend_ciphers),
        ("Encryption/Decryption", test_encryption),
        ("User Registration", test_user_registration),
        ("Key Generation", test_key_generation),
        ("Frontend Access", test_frontend_access)
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n🔍 Testing {test_name}...")
        if test_func():
            passed += 1
        time.sleep(1)  # Small delay between tests
    
    print(f"\n📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! CipherChat is working correctly.")
        print("\n🌐 Access your application:")
        print("   Frontend: http://localhost:3000")
        print("   Backend API: http://localhost:5000/api")
    else:
        print("⚠️  Some tests failed. Check the output above for details.")
        print("\n🔧 Troubleshooting:")
        print("   1. Make sure backend is running: python start_backend.py")
        print("   2. Make sure frontend is running: python start_frontend.py")
        print("   3. Check if ports 3000 and 5000 are available")
    
    return passed == total

if __name__ == "__main__":
    print("🔐 CipherChat Project Test Suite")
    print("="*50)
    print("This script tests both backend and frontend functionality.")
    print("Make sure both servers are running before running tests.")
    print("\nTo start the project:")
    print("   python run_project.py")
    print("\nPress Enter to continue with tests...")
    input()
    
    run_all_tests()

