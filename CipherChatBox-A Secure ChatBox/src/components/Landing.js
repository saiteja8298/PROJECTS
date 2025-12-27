import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaUserSecret, FaArrowRight } from 'react-icons/fa';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing-container">
        {/* Header */}
        <motion.header 
          className="landing-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="logo">
            <FaShieldAlt className="logo-icon" />
            <span>CipherChat</span>
          </div>
          <nav className="nav-links">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link primary">Get Started</Link>
          </nav>
        </motion.header>

        {/* Hero Section */}
        <motion.section 
          className="hero"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="hero-content">
            <h1 className="hero-title">
              Secure Messaging
              <span className="gradient-text"> Reimagined</span>
            </h1>
            <p className="hero-description">
              Experience the future of encrypted communication with CipherChat. 
              Advanced encryption algorithms ensure your conversations remain private and secure.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary">
                Start Messaging
                <FaArrowRight className="btn-icon" />
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Sign In
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="chat-preview">
              <div className="chat-header">
                <div className="chat-user">
                  <div className="avatar"></div>
                  <span>Secure Chat</span>
                </div>
                <div className="encryption-status">
                  <FaLock />
                  <span>End-to-End Encrypted</span>
                </div>
              </div>
              <div className="chat-messages">
                <div className="message received">
                  <div className="message-content">
                    <span className="encrypted-text">🔒 x9k2m8p4q1w7...</span>
                  </div>
                </div>
                <div className="message sent">
                  <div className="message-content">
                    <span className="encrypted-text">🔒 a7b3c9d2e5f8...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="features-title">Why Choose CipherChat?</h2>
          <div className="features-grid">
            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <FaShieldAlt className="feature-icon" />
              <h3>Military-Grade Encryption</h3>
              <p>Multiple encryption algorithms including AES-256, RSA, and custom ciphers for maximum security.</p>
            </motion.div>
            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <FaLock className="feature-icon" />
              <h3>Zero-Knowledge Architecture</h3>
              <p>Your messages are encrypted before leaving your device. We can't read them even if we wanted to.</p>
            </motion.div>
            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <FaUserSecret className="feature-icon" />
              <h3>Anonymous Communication</h3>
              <p>No personal data collection. Your identity remains private while you communicate securely.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="cta"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="cta-content">
            <h2>Ready to Secure Your Conversations?</h2>
            <p>Join thousands of users who trust CipherChat for their private communications.</p>
            <Link to="/register" className="btn btn-primary btn-large">
              Get Started Now
              <FaArrowRight className="btn-icon" />
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Landing;

