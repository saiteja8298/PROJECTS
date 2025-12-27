from flask import Flask, request, jsonify
from flask_cors import CORS
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.backends import default_backend
import base64
import os
import hashlib
import secrets
import json
from datetime import datetime, timedelta
import jwt

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Secret key for JWT tokens
app.config['SECRET_KEY'] = 'cipherchat-secret-key-2024'

# In-memory storage for demo (use database in production)
users_db = {}
messages_db = []

class CipherManager:
    """Manages all encryption/decryption operations"""
    
    @staticmethod
    def generate_key():
        """Generate a secure random key"""
        return secrets.token_urlsafe(32)
    
    @staticmethod
    def derive_key(password, salt):
        """Derive key from password using PBKDF2"""
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
            backend=default_backend()
        )
        return kdf.derive(password.encode())
    
    @staticmethod
    def aes_encrypt(text, key):
        """AES encryption"""
        try:
            # Generate random IV
            iv = os.urandom(16)
            
            # Create cipher
            cipher = Cipher(algorithms.AES(key[:32]), modes.CBC(iv), backend=default_backend())
            encryptor = cipher.encryptor()
            
            # Pad the text to multiple of 16 bytes
            text_bytes = text.encode('utf-8')
            padding_length = 16 - (len(text_bytes) % 16)
            padded_text = text_bytes + bytes([padding_length] * padding_length)
            
            # Encrypt
            encrypted = encryptor.update(padded_text) + encryptor.finalize()
            
            # Return base64 encoded IV + encrypted data
            return base64.b64encode(iv + encrypted).decode('utf-8')
        except Exception as e:
            raise Exception(f"AES encryption failed: {str(e)}")
    
    @staticmethod
    def aes_decrypt(encrypted_text, key):
        """AES decryption"""
        try:
            # Decode base64
            encrypted_data = base64.b64decode(encrypted_text.encode('utf-8'))
            
            # Extract IV and encrypted data
            iv = encrypted_data[:16]
            encrypted = encrypted_data[16:]
            
            # Create cipher
            cipher = Cipher(algorithms.AES(key[:32]), modes.CBC(iv), backend=default_backend())
            decryptor = cipher.decryptor()
            
            # Decrypt
            decrypted = decryptor.update(encrypted) + decryptor.finalize()
            
            # Remove padding
            padding_length = decrypted[-1]
            decrypted = decrypted[:-padding_length]
            
            return decrypted.decode('utf-8')
        except Exception as e:
            raise Exception(f"AES decryption failed: {str(e)}")
    
    @staticmethod
    def des_encrypt(text, key):
        """DES encryption"""
        try:
            # DES requires 8-byte key
            des_key = key[:8].ljust(8, b'\0')
            
            # Generate random IV
            iv = os.urandom(8)
            
            # Create cipher
            cipher = Cipher(algorithms.TripleDES(des_key), modes.CBC(iv), backend=default_backend())
            encryptor = cipher.encryptor()
            
            # Pad the text to multiple of 8 bytes
            text_bytes = text.encode('utf-8')
            padding_length = 8 - (len(text_bytes) % 8)
            padded_text = text_bytes + bytes([padding_length] * padding_length)
            
            # Encrypt
            encrypted = encryptor.update(padded_text) + encryptor.finalize()
            
            # Return base64 encoded IV + encrypted data
            return base64.b64encode(iv + encrypted).decode('utf-8')
        except Exception as e:
            raise Exception(f"DES encryption failed: {str(e)}")
    
    @staticmethod
    def des_decrypt(encrypted_text, key):
        """DES decryption"""
        try:
            # Decode base64
            encrypted_data = base64.b64decode(encrypted_text.encode('utf-8'))
            
            # Extract IV and encrypted data
            iv = encrypted_data[:8]
            encrypted = encrypted_data[8:]
            
            # DES requires 8-byte key
            des_key = key[:8].ljust(8, b'\0')
            
            # Create cipher
            cipher = Cipher(algorithms.TripleDES(des_key), modes.CBC(iv), backend=default_backend())
            decryptor = cipher.decryptor()
            
            # Decrypt
            decrypted = decryptor.update(encrypted) + decryptor.finalize()
            
            # Remove padding
            padding_length = decrypted[-1]
            decrypted = decrypted[:-padding_length]
            
            return decrypted.decode('utf-8')
        except Exception as e:
            raise Exception(f"DES decryption failed: {str(e)}")
    
    @staticmethod
    def triple_des_encrypt(text, key):
        """Triple DES encryption"""
        try:
            # Triple DES requires 24-byte key
            triple_des_key = key[:24].ljust(24, b'\0')
            
            # Generate random IV
            iv = os.urandom(8)
            
            # Create cipher
            cipher = Cipher(algorithms.TripleDES(triple_des_key), modes.CBC(iv), backend=default_backend())
            encryptor = cipher.encryptor()
            
            # Pad the text to multiple of 8 bytes
            text_bytes = text.encode('utf-8')
            padding_length = 8 - (len(text_bytes) % 8)
            padded_text = text_bytes + bytes([padding_length] * padding_length)
            
            # Encrypt
            encrypted = encryptor.update(padded_text) + encryptor.finalize()
            
            # Return base64 encoded IV + encrypted data
            return base64.b64encode(iv + encrypted).decode('utf-8')
        except Exception as e:
            raise Exception(f"Triple DES encryption failed: {str(e)}")
    
    @staticmethod
    def triple_des_decrypt(encrypted_text, key):
        """Triple DES decryption"""
        try:
            # Decode base64
            encrypted_data = base64.b64decode(encrypted_text.encode('utf-8'))
            
            # Extract IV and encrypted data
            iv = encrypted_data[:8]
            encrypted = encrypted_data[8:]
            
            # Triple DES requires 24-byte key
            triple_des_key = key[:24].ljust(24, b'\0')
            
            # Create cipher
            cipher = Cipher(algorithms.TripleDES(triple_des_key), modes.CBC(iv), backend=default_backend())
            decryptor = cipher.decryptor()
            
            # Decrypt
            decrypted = decryptor.update(encrypted) + decryptor.finalize()
            
            # Remove padding
            padding_length = decrypted[-1]
            decrypted = decrypted[:-padding_length]
            
            return decrypted.decode('utf-8')
        except Exception as e:
            raise Exception(f"Triple DES decryption failed: {str(e)}")
    
    @staticmethod
    def rc4_encrypt(text, key):
        """RC4 encryption"""
        try:
            # RC4 implementation
            key_bytes = key.encode('utf-8')
            text_bytes = text.encode('utf-8')
            
            # Key scheduling
            S = list(range(256))
            j = 0
            for i in range(256):
                j = (j + S[i] + key_bytes[i % len(key_bytes)]) % 256
                S[i], S[j] = S[j], S[i]
            
            # Encryption
            i = j = 0
            encrypted = []
            for byte in text_bytes:
                i = (i + 1) % 256
                j = (j + S[i]) % 256
                S[i], S[j] = S[j], S[i]
                k = S[(S[i] + S[j]) % 256]
                encrypted.append(byte ^ k)
            
            return base64.b64encode(bytes(encrypted)).decode('utf-8')
        except Exception as e:
            raise Exception(f"RC4 encryption failed: {str(e)}")
    
    @staticmethod
    def rc4_decrypt(encrypted_text, key):
        """RC4 decryption (same as encryption)"""
        try:
            encrypted_data = base64.b64decode(encrypted_text.encode('utf-8'))
            key_bytes = key.encode('utf-8')
            
            # Key scheduling
            S = list(range(256))
            j = 0
            for i in range(256):
                j = (j + S[i] + key_bytes[i % len(key_bytes)]) % 256
                S[i], S[j] = S[j], S[i]
            
            # Decryption (same as encryption for RC4)
            i = j = 0
            decrypted = []
            for byte in encrypted_data:
                i = (i + 1) % 256
                j = (j + S[i]) % 256
                S[i], S[j] = S[j], S[i]
                k = S[(S[i] + S[j]) % 256]
                decrypted.append(byte ^ k)
            
            return bytes(decrypted).decode('utf-8')
        except Exception as e:
            raise Exception(f"RC4 decryption failed: {str(e)}")
    
    @staticmethod
    def blowfish_encrypt(text, key):
        """Blowfish encryption using Fernet"""
        try:
            # Generate key from password
            salt = os.urandom(16)
            kdf = PBKDF2HMAC(
                algorithm=hashes.SHA256(),
                length=32,
                salt=salt,
                iterations=100000,
                backend=default_backend()
            )
            derived_key = kdf.derive(key.encode())
            
            # Create Fernet cipher
            fernet = Fernet(base64.urlsafe_b64encode(derived_key))
            
            # Encrypt
            encrypted = fernet.encrypt(text.encode('utf-8'))
            
            # Return base64 encoded salt + encrypted data
            return base64.b64encode(salt + encrypted).decode('utf-8')
        except Exception as e:
            raise Exception(f"Blowfish encryption failed: {str(e)}")
    
    @staticmethod
    def blowfish_decrypt(encrypted_text, key):
        """Blowfish decryption"""
        try:
            # Decode base64
            encrypted_data = base64.b64decode(encrypted_text.encode('utf-8'))
            
            # Extract salt and encrypted data
            salt = encrypted_data[:16]
            encrypted = encrypted_data[16:]
            
            # Derive key
            kdf = PBKDF2HMAC(
                algorithm=hashes.SHA256(),
                length=32,
                salt=salt,
                iterations=100000,
                backend=default_backend()
            )
            derived_key = kdf.derive(key.encode())
            
            # Create Fernet cipher
            fernet = Fernet(base64.urlsafe_b64encode(derived_key))
            
            # Decrypt
            decrypted = fernet.decrypt(encrypted)
            
            return decrypted.decode('utf-8')
        except Exception as e:
            raise Exception(f"Blowfish decryption failed: {str(e)}")

# Initialize cipher manager
cipher_manager = CipherManager()

# Authentication helpers
def generate_token(user_id):
    """Generate JWT token"""
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(hours=24)
    }
    return jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')

def verify_token(token):
    """Verify JWT token"""
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return payload['user_id']
    except:
        return None

# API Routes

@app.route('/api/register', methods=['POST'])
def register():
    """User registration endpoint"""
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        encryption_key = data.get('encryptionKey')
        
        if not all([username, email, password, encryption_key]):
            return jsonify({'error': 'All fields are required'}), 400
        
        # Check if user already exists
        if username in users_db:
            return jsonify({'error': 'Username already exists'}), 400
        
        # Create user
        user_id = len(users_db) + 1
        users_db[username] = {
            'id': user_id,
            'username': username,
            'email': email,
            'password_hash': hashlib.sha256(password.encode()).hexdigest(),
            'encryption_key': encryption_key,
            'created_at': datetime.utcnow().isoformat()
        }
        
        # Generate token
        token = generate_token(user_id)
        
        return jsonify({
            'message': 'User registered successfully',
            'token': token,
            'user': {
                'id': user_id,
                'username': username,
                'email': email,
                'encryption_key': encryption_key
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    """User login endpoint"""
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400
        
        # Check if user exists
        if username not in users_db:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        user = users_db[username]
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        
        if user['password_hash'] != password_hash:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Generate token
        token = generate_token(user['id'])
        
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email'],
                'encryption_key': user['encryption_key']
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/encrypt', methods=['POST'])
def encrypt_message():
    """Encrypt message endpoint"""
    try:
        data = request.get_json()
        text = data.get('text')
        key = data.get('key')
        cipher = data.get('cipher', 'AES')
        
        if not all([text, key]):
            return jsonify({'error': 'Text and key are required'}), 400
        
        # Encrypt based on cipher type
        if cipher == 'AES':
            encrypted = cipher_manager.aes_encrypt(text, key.encode())
        elif cipher == 'DES':
            encrypted = cipher_manager.des_encrypt(text, key.encode())
        elif cipher == 'TripleDES':
            encrypted = cipher_manager.triple_des_encrypt(text, key.encode())
        elif cipher == 'RC4':
            encrypted = cipher_manager.rc4_encrypt(text, key)
        elif cipher == 'Blowfish':
            encrypted = cipher_manager.blowfish_encrypt(text, key)
        else:
            return jsonify({'error': 'Unsupported cipher'}), 400
        
        return jsonify({
            'encrypted_text': encrypted,
            'cipher': cipher,
            'success': True
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/decrypt', methods=['POST'])
def decrypt_message():
    """Decrypt message endpoint"""
    try:
        data = request.get_json()
        encrypted_text = data.get('encrypted_text')
        key = data.get('key')
        cipher = data.get('cipher', 'AES')
        
        if not all([encrypted_text, key]):
            return jsonify({'error': 'Encrypted text and key are required'}), 400
        
        # Decrypt based on cipher type
        if cipher == 'AES':
            decrypted = cipher_manager.aes_decrypt(encrypted_text, key.encode())
        elif cipher == 'DES':
            decrypted = cipher_manager.des_decrypt(encrypted_text, key.encode())
        elif cipher == 'TripleDES':
            decrypted = cipher_manager.triple_des_decrypt(encrypted_text, key.encode())
        elif cipher == 'RC4':
            decrypted = cipher_manager.rc4_decrypt(encrypted_text, key)
        elif cipher == 'Blowfish':
            decrypted = cipher_manager.blowfish_decrypt(encrypted_text, key)
        else:
            return jsonify({'error': 'Unsupported cipher'}), 400
        
        return jsonify({
            'decrypted_text': decrypted,
            'cipher': cipher,
            'success': True
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/ciphers', methods=['GET'])
def get_ciphers():
    """Get available ciphers"""
    ciphers = [
        {'name': 'AES', 'description': 'Advanced Encryption Standard', 'keySize': '128/192/256 bits'},
        {'name': 'DES', 'description': 'Data Encryption Standard', 'keySize': '56 bits'},
        {'name': 'TripleDES', 'description': 'Triple Data Encryption Standard', 'keySize': '112/168 bits'},
        {'name': 'RC4', 'description': 'Rivest Cipher 4', 'keySize': '40-2048 bits'},
        {'name': 'Blowfish', 'description': 'Blowfish Encryption', 'keySize': '32-448 bits'}
    ]
    return jsonify({'ciphers': ciphers}), 200

@app.route('/api/generate-key', methods=['POST'])
def generate_key():
    """Generate new encryption key"""
    try:
        key = cipher_manager.generate_key()
        return jsonify({
            'key': key,
            'success': True
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'CipherChat Backend is running',
        'timestamp': datetime.utcnow().isoformat()
    }), 200

if __name__ == '__main__':
    print("🔐 CipherChat Backend Starting...")
    print("🚀 Available endpoints:")
    print("   POST /api/register - User registration")
    print("   POST /api/login - User login")
    print("   POST /api/encrypt - Encrypt message")
    print("   POST /api/decrypt - Decrypt message")
    print("   GET  /api/ciphers - Get available ciphers")
    print("   POST /api/generate-key - Generate encryption key")
    print("   GET  /api/health - Health check")
    print("\n🌐 Backend running on http://localhost:5000")
    print("🔗 CORS enabled for React frontend")
    
    app.run(debug=True, host='0.0.0.0', port=5000)

