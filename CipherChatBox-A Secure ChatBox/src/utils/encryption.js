import CryptoJS from 'crypto-js';

// Available encryption algorithms
export const CIPHERS = {
  AES: 'AES',
  DES: 'DES',
  TripleDES: 'TripleDES',
  RC4: 'RC4',
  Blowfish: 'Blowfish'
};

// Encrypt text using specified cipher
export const encrypt = (text, key, cipher = CIPHERS.AES) => {
  try {
    if (!text || !key) {
      throw new Error('Text and key are required');
    }

    let encrypted;
    switch (cipher) {
      case CIPHERS.AES:
        encrypted = CryptoJS.AES.encrypt(text, key);
        break;
      case CIPHERS.DES:
        encrypted = CryptoJS.DES.encrypt(text, key);
        break;
      case CIPHERS.TripleDES:
        encrypted = CryptoJS.TripleDES.encrypt(text, key);
        break;
      case CIPHERS.RC4:
        encrypted = CryptoJS.RC4.encrypt(text, key);
        break;
      case CIPHERS.Blowfish:
        encrypted = CryptoJS.Blowfish.encrypt(text, key);
        break;
      default:
        encrypted = CryptoJS.AES.encrypt(text, key);
    }

    return encrypted.toString();
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt message');
  }
};

// Decrypt text using specified cipher
export const decrypt = (encryptedText, key, cipher = CIPHERS.AES) => {
  try {
    if (!encryptedText || !key) {
      throw new Error('Encrypted text and key are required');
    }

    let decrypted;
    switch (cipher) {
      case CIPHERS.AES:
        decrypted = CryptoJS.AES.decrypt(encryptedText, key);
        break;
      case CIPHERS.DES:
        decrypted = CryptoJS.DES.decrypt(encryptedText, key);
        break;
      case CIPHERS.TripleDES:
        decrypted = CryptoJS.TripleDES.decrypt(encryptedText, key);
        break;
      case CIPHERS.RC4:
        decrypted = CryptoJS.RC4.decrypt(encryptedText, key);
        break;
      case CIPHERS.Blowfish:
        decrypted = CryptoJS.Blowfish.decrypt(encryptedText, key);
        break;
      default:
        decrypted = CryptoJS.AES.decrypt(encryptedText, key);
    }

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedText) {
      throw new Error('Invalid key or corrupted data');
    }

    return decryptedText;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt message');
  }
};

// Generate a random encryption key
export const generateKey = (length = 16) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Generate a secure random key using CryptoJS
export const generateSecureKey = () => {
  return CryptoJS.lib.WordArray.random(32).toString();
};

// Hash a key for storage (one-way)
export const hashKey = (key) => {
  return CryptoJS.SHA256(key).toString();
};

// Verify key strength
export const validateKeyStrength = (key) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(key);
  const hasLowerCase = /[a-z]/.test(key);
  const hasNumbers = /\d/.test(key);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(key);

  return {
    isValid: key.length >= minLength,
    strength: {
      length: key.length >= minLength,
      upperCase: hasUpperCase,
      lowerCase: hasLowerCase,
      numbers: hasNumbers,
      specialChars: hasSpecialChars
    },
    score: [key.length >= minLength, hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars]
      .filter(Boolean).length
  };
};

// Encrypt multiple messages in batch
export const encryptBatch = (messages, key, cipher = CIPHERS.AES) => {
  return messages.map(message => ({
    ...message,
    encryptedText: encrypt(message.text, key, cipher),
    cipher: cipher
  }));
};

// Decrypt multiple messages in batch
export const decryptBatch = (encryptedMessages, key) => {
  return encryptedMessages.map(message => {
    try {
      return {
        ...message,
        text: decrypt(message.encryptedText, key, message.cipher)
      };
    } catch (error) {
      return {
        ...message,
        text: 'Unable to decrypt message',
        error: true
      };
    }
  });
};

// Create a message with metadata
export const createEncryptedMessage = (text, sender, key, cipher = CIPHERS.AES) => {
  const encryptedText = encrypt(text, key, cipher);
  return {
    id: Date.now() + Math.random(),
    text: text,
    encryptedText: encryptedText,
    sender: sender,
    timestamp: new Date(),
    encrypted: true,
    cipher: cipher
  };
};

// Utility to check if text is encrypted
export const isEncrypted = (text) => {
  // Simple check - encrypted text usually contains base64 characters and is longer
  return /^[A-Za-z0-9+/=]+$/.test(text) && text.length > 20;
};

// Get cipher information
export const getCipherInfo = (cipher) => {
  const cipherInfo = {
    [CIPHERS.AES]: {
      name: 'Advanced Encryption Standard',
      keySize: '128/192/256 bits',
      security: 'High',
      speed: 'Fast'
    },
    [CIPHERS.DES]: {
      name: 'Data Encryption Standard',
      keySize: '56 bits',
      security: 'Low',
      speed: 'Fast'
    },
    [CIPHERS.TripleDES]: {
      name: 'Triple Data Encryption Standard',
      keySize: '112/168 bits',
      security: 'Medium',
      speed: 'Medium'
    },
    [CIPHERS.RC4]: {
      name: 'Rivest Cipher 4',
      keySize: '40-2048 bits',
      security: 'Medium',
      speed: 'Very Fast'
    },
    [CIPHERS.Blowfish]: {
      name: 'Blowfish Encryption',
      keySize: '32-448 bits',
      security: 'High',
      speed: 'Fast'
    }
  };

  return cipherInfo[cipher] || cipherInfo[CIPHERS.AES];
};
