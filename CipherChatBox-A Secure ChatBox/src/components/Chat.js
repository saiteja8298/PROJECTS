import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaLock, 
  FaUnlock, 
  FaKey, 
  FaCog, 
  FaSignOutAlt, 
  FaPaperPlane,
  FaUser,
  FaEllipsisV,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import apiService from '../services/api';
import './Chat.css';

const Chat = ({ user, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedCipher, setSelectedCipher] = useState('AES');
  const [encryptionKey, setEncryptionKey] = useState(user?.encryptionKey || 'default-key-12345');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDecryption, setShowDecryption] = useState(false);
  const [decryptionText, setDecryptionText] = useState('');
  const [decryptionKey, setDecryptionKey] = useState('');
  const [decryptionCipher, setDecryptionCipher] = useState('AES');
  const [decryptedResult, setDecryptedResult] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [aliceMessages, setAliceMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const aliceMessagesEndRef = useRef(null);

  const ciphers = [
    { name: 'AES', description: 'Advanced Encryption Standard' },
    { name: 'DES', description: 'Data Encryption Standard' },
    { name: 'TripleDES', description: 'Triple Data Encryption Standard' },
    { name: 'RC4', description: 'Rivest Cipher 4' },
    { name: 'Blowfish', description: 'Blowfish Encryption' }
  ];

  useEffect(() => {
    // Simulate online users
    setOnlineUsers([
      { id: 1, username: 'Alice', status: 'online', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice' },
      { id: 2, username: 'Bob', status: 'online', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob' },
      { id: 3, username: 'Charlie', status: 'away', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie' }
    ]);

    // Add some sample messages with real encrypted data
    const sampleMessages = [
      {
        id: 1,
        text: 'Hello! This is an encrypted message.',
        encryptedText: 'x9k2m8p4q1w7a3b5c9d2e6f8g1h4i7j0k3l6m9n2o5p8q1r4s7t0u3v6w9x2y5z8',
        sender: 'Alice',
        timestamp: new Date(Date.now() - 3600000),
        encrypted: true,
        cipher: 'AES'
      },
      {
        id: 2,
        text: 'Hi Alice! How are you?',
        encryptedText: 'a7b3c9d2e5f8g1h4i7j0k3l6m9n2o5p8q1r4s7t0u3v6w9x2y5z8a1b4c7d0e3f6g9h2i5j8k1l4m7n0o3p6q9r2s5t8u1v4w7x0y3z6',
        sender: user.username,
        timestamp: new Date(Date.now() - 1800000),
        encrypted: true,
        cipher: 'AES'
      }
    ];

    // Auto-decrypt messages when component mounts
    const decryptMessages = async () => {
      const decryptedMessages = await Promise.all(
        sampleMessages.map(msg => autoDecryptMessage(msg))
      );
      setMessages(decryptedMessages);
    };

    decryptMessages();
  }, [user, encryptionKey]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    scrollToAliceBottom();
  }, [aliceMessages]);

  const scrollToAliceBottom = () => {
    aliceMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const encryptMessage = async (text, cipher, key) => {
    try {
      const response = await apiService.encryptMessage(text, key, cipher);
      return response.encrypted_text;
    } catch (error) {
      console.error('Encryption error:', error);
      toast.error('Encryption failed: ' + error.message);
      return text;
    }
  };

  const decryptMessage = async (encryptedText, cipher, key) => {
    try {
      const response = await apiService.decryptMessage(encryptedText, key, cipher);
      return response.decrypted_text;
    } catch (error) {
      console.error('Decryption error:', error);
      toast.error('Decryption failed: ' + error.message);
      return 'Unable to decrypt message';
    }
  };

  // Auto-decrypt received messages
  const autoDecryptMessage = async (message) => {
    if (message.encrypted && message.encryptedText && encryptionKey) {
      try {
        const decryptedText = await decryptMessage(message.encryptedText, message.cipher, encryptionKey);
        return {
          ...message,
          text: decryptedText,
          decrypted: true
        };
      } catch (error) {
        console.error('Auto-decryption failed:', error);
        return {
          ...message,
          text: '🔒 Encrypted message (decryption failed)',
          decrypted: false
        };
      }
    }
    return message;
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !encryptionKey) {
      toast.error('Please enter a message and encryption key');
      return;
    }

    try {
      const encryptedText = await encryptMessage(newMessage, selectedCipher, encryptionKey);
      
      // Add to your chat
      const yourMessage = {
        id: Date.now(),
        text: newMessage,
        encryptedText: encryptedText,
        sender: user.username,
        timestamp: new Date(),
        encrypted: true,
        cipher: selectedCipher
      };

      // Add to Alice's chat (decrypted)
      const aliceMessage = {
        id: Date.now() + 1,
        text: newMessage,
        encryptedText: encryptedText,
        sender: user.username,
        timestamp: new Date(),
        encrypted: true,
        cipher: selectedCipher,
        decrypted: true
      };

      setMessages([...messages, yourMessage]);
      setAliceMessages([...aliceMessages, aliceMessage]);
      setNewMessage('');
      toast.success('Message encrypted and sent to Alice!');
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLogout = () => {
    onLogout();
    toast.success('Logged out successfully');
  };

  const handleDecrypt = async () => {
    if (!decryptionText.trim() || !decryptionKey.trim()) {
      toast.error('Please enter both encrypted text and decryption key');
      return;
    }

    try {
      const result = await decryptMessage(decryptionText, decryptionCipher, decryptionKey);
      setDecryptedResult(result);
      toast.success('Message decrypted successfully!');
    } catch (error) {
      setDecryptedResult('Failed to decrypt message. Check your key and cipher.');
      toast.error('Decryption failed');
    }
  };

  const clearDecryption = () => {
    setDecryptionText('');
    setDecryptionKey('');
    setDecryptedResult('');
    setDecryptionCipher('AES');
  };

  // Simulate receiving encrypted messages from friends
  const simulateReceivedMessage = async () => {
    const friendMessages = [
      {
        id: Date.now() + Math.random(),
        text: 'Hey! How are you doing?',
        encryptedText: 'encrypted_data_here', // This would be real encrypted data
        sender: 'Alice',
        timestamp: new Date(),
        encrypted: true,
        cipher: 'AES'
      },
      {
        id: Date.now() + Math.random() + 1,
        text: 'Can you help me with the project?',
        encryptedText: 'encrypted_data_here_2', // This would be real encrypted data
        sender: 'Bob',
        timestamp: new Date(),
        encrypted: true,
        cipher: 'AES'
      }
    ];

    // Auto-decrypt received messages
    const decryptedMessages = await Promise.all(
      friendMessages.map(msg => autoDecryptMessage(msg))
    );

    setMessages(prev => [...prev, ...decryptedMessages]);
    toast.success('New encrypted messages received and decrypted!');
  };

  return (
    <div className="chat">
      <div className="chat-container">
        {/* Header */}
        <header className="chat-header">
          <div className="header-left">
            <FaShieldAlt className="logo-icon" />
            <span className="app-name">CipherChat</span>
          </div>
          <div className="header-center">
            <div className="encryption-status">
              <FaLock className="lock-icon" />
              <span>End-to-End Encrypted</span>
            </div>
          </div>
          <div className="header-right">
            <button 
              className="simulate-btn"
              onClick={simulateReceivedMessage}
              title="Simulate receiving encrypted messages"
            >
              <FaUser />
            </button>
            <button 
              className="settings-btn"
              onClick={() => setShowSettings(!showSettings)}
            >
              <FaCog />
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
            </button>
          </div>
        </header>

        <div className="chat-main">
          {/* Your Chat Area - Left Side */}
          <main className="your-chat-area">
            <div className="chat-header-section">
              <div className="user-profile-header">
                <div className="user-avatar-animated">
                  <div className="avatar-ring"></div>
                  <img src={user.avatar} alt={user.username} />
                  <div className="online-pulse"></div>
                </div>
                <div className="user-details">
                  <p>Online</p>
                </div>
              </div>
              <div className="chat-controls">
                <button className="control-btn">📞</button>
                <button className="control-btn">📹</button>
                <button className="control-btn">⚙️</button>
              </div>
            </div>

            <div className="messages-container">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`message-bubble ${message.sender === user.username ? 'sent' : 'received'}`}
                  >
                    <div className="message-avatar">
                      <img src={message.sender === user.username ? user.avatar : "https://api.dicebear.com/7.x/avataaars/svg?seed=alice"} alt={message.sender} />
                    </div>
                    <div className="message-content">
                      <p>{message.text || 'No message content'}</p>
                      {message.encrypted && (
                        <div className="encryption-details">
                          <div className="encryption-status">
                            {message.decrypted ? (
                              <span className="decrypted-indicator">🔓 Decrypted</span>
                            ) : (
                              <span className="encrypted-indicator">🔒 Encrypted</span>
                            )}
                          </div>
                          <div className="cipher-info">
                            <small>Algorithm: {message.cipher}</small>
                          </div>
                          <div className="encrypted-text-preview">
                            <small>Encrypted: {message.encryptedText?.substring(0, 30)}...</small>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <div className="message-input-container">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Write your message..."
                  className="message-input"
                />
                <button className="attachment-btn">📎</button>
                <button 
                  onClick={handleSendMessage}
                  className="send-btn"
                  disabled={!newMessage.trim() || !encryptionKey}
                >
                  ✈️
                </button>
              </div>
            </div>
          </main>

          {/* Alice's Chat Area - Right Side */}
          <main className="alice-chat-area">
            <div className="chat-header-section">
              <div className="user-profile-header">
                <div className="user-avatar-animated">
                  <div className="avatar-ring"></div>
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=alice" alt="Alice" />
                  <div className="online-pulse"></div>
                </div>
                <div className="user-details">
                  <p>Online</p>
                </div>
              </div>
              <div className="chat-controls">
                <button className="control-btn">📞</button>
                <button className="control-btn">📹</button>
                <button className="control-btn">⚙️</button>
              </div>
            </div>

            <div className="messages-container">
              <AnimatePresence>
                {aliceMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`message-bubble ${message.sender === user.username ? 'sent' : 'received'}`}
                  >
                    <div className="message-avatar">
                      <img src={message.sender === user.username ? user.avatar : "https://api.dicebear.com/7.x/avataaars/svg?seed=alice"} alt={message.sender} />
                    </div>
                    <div className="message-content">
                      <p>{message.text || 'No message content'}</p>
                      {message.encrypted && (
                        <div className="encryption-details">
                          <div className="encryption-status">
                            {message.decrypted ? (
                              <span className="decrypted-indicator">🔓 Decrypted</span>
                            ) : (
                              <span className="encrypted-indicator">🔒 Encrypted</span>
                            )}
                          </div>
                          <div className="cipher-info">
                            <small>Algorithm: {message.cipher}</small>
                          </div>
                          <div className="encrypted-text-preview">
                            <small>Encrypted: {message.encryptedText?.substring(0, 30)}...</small>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={aliceMessagesEndRef} />
            </div>

            <div className="message-input-container">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Write your message..."
                  className="message-input"
                />
                <button className="attachment-btn">📎</button>
                <button 
                  onClick={handleSendMessage}
                  className="send-btn"
                  disabled={!newMessage.trim() || !encryptionKey}
                >
                  ✈️
                </button>
              </div>
            </div>
          </main>
        </div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="settings-panel"
            >
              <div className="settings-header">
                <h3>Settings</h3>
                <button onClick={() => setShowSettings(false)}>×</button>
              </div>
              <div className="settings-content">
                <div className="setting-item">
                  <label>Default Cipher</label>
                  <select 
                    value={selectedCipher} 
                    onChange={(e) => setSelectedCipher(e.target.value)}
                  >
                    {ciphers.map(cipher => (
                      <option key={cipher.name} value={cipher.name}>
                        {cipher.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="setting-item">
                  <label>Encryption Key</label>
                  <input
                    type="password"
                    value={encryptionKey}
                    onChange={(e) => setEncryptionKey(e.target.value)}
                    placeholder="Enter encryption key"
                  />
                </div>
                <div className="setting-item">
                  <label>Auto-encrypt messages</label>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Chat;
