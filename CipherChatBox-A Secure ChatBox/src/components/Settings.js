import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaArrowLeft, 
  FaUser, 
  FaKey, 
  FaLock, 
  FaBell, 
  FaPalette, 
  FaSignOutAlt,
  FaSave,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import './Settings.css';

const Settings = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showKey, setShowKey] = useState(false);
  const [settings, setSettings] = useState({
    encryptionKey: user?.encryptionKey || '',
    defaultCipher: 'AES',
    notifications: true,
    autoEncrypt: true,
    theme: 'dark',
    language: 'en'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'security', label: 'Security', icon: FaLock },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'appearance', label: 'Appearance', icon: FaPalette }
  ];

  const ciphers = [
    { name: 'AES', description: 'Advanced Encryption Standard' },
    { name: 'DES', description: 'Data Encryption Standard' },
    { name: 'TripleDES', description: 'Triple Data Encryption Standard' },
    { name: 'RC4', description: 'Rivest Cipher 4' },
    { name: 'Blowfish', description: 'Blowfish Encryption' }
  ];

  const handleSave = () => {
    // Save settings to localStorage or API
    localStorage.setItem('cipherchat_settings', JSON.stringify(settings));
    toast.success('Settings saved successfully!');
  };

  const handleLogout = () => {
    onLogout();
    toast.success('Logged out successfully');
  };

  const generateNewKey = () => {
    const newKey = Math.random().toString(36).substring(2, 15) + 
                   Math.random().toString(36).substring(2, 15);
    setSettings({
      ...settings,
      encryptionKey: newKey
    });
    toast.success('New encryption key generated!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="tab-content">
            <div className="profile-section">
              <div className="profile-header">
                <img src={user.avatar} alt={user.username} className="profile-avatar" />
                <div className="profile-info">
                  <h3>{user.username}</h3>
                  <p>{user.email}</p>
                  <span className="join-date">
                    Member since {new Date(user.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="tab-content">
            <div className="security-section">
              <div className="setting-group">
                <h4>Encryption Settings</h4>
                <div className="setting-item">
                  <label>Encryption Key</label>
                  <div className="key-input-group">
                    <input
                      type={showKey ? 'text' : 'password'}
                      value={settings.encryptionKey}
                      onChange={(e) => setSettings({...settings, encryptionKey: e.target.value})}
                      className="key-input"
                      placeholder="Enter encryption key"
                    />
                    <button 
                      className="toggle-key-btn"
                      onClick={() => setShowKey(!showKey)}
                    >
                      {showKey ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <button 
                      className="generate-key-btn"
                      onClick={generateNewKey}
                    >
                      <FaKey />
                      Generate
                    </button>
                  </div>
                  <p className="key-warning">
                    ⚠️ Keep your encryption key safe. If lost, you won't be able to decrypt your messages.
                  </p>
                </div>

                <div className="setting-item">
                  <label>Default Cipher</label>
                  <select 
                    value={settings.defaultCipher}
                    onChange={(e) => setSettings({...settings, defaultCipher: e.target.value})}
                    className="cipher-select"
                  >
                    {ciphers.map(cipher => (
                      <option key={cipher.name} value={cipher.name}>
                        {cipher.name} - {cipher.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="setting-item">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={settings.autoEncrypt}
                      onChange={(e) => setSettings({...settings, autoEncrypt: e.target.checked})}
                    />
                    <span className="checkmark"></span>
                    Auto-encrypt all messages
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="tab-content">
            <div className="notifications-section">
              <div className="setting-group">
                <h4>Notification Settings</h4>
                <div className="setting-item">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
                    />
                    <span className="checkmark"></span>
                    Enable notifications
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="tab-content">
            <div className="appearance-section">
              <div className="setting-group">
                <h4>Theme Settings</h4>
                <div className="setting-item">
                  <label>Theme</label>
                  <select 
                    value={settings.theme}
                    onChange={(e) => setSettings({...settings, theme: e.target.value})}
                    className="theme-select"
                  >
                    <option value="dark">Dark Theme</option>
                    <option value="darker">Darker Theme</option>
                    <option value="black">Pure Black</option>
                  </select>
                </div>

                <div className="setting-item">
                  <label>Language</label>
                  <select 
                    value={settings.language}
                    onChange={(e) => setSettings({...settings, language: e.target.value})}
                    className="language-select"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="settings">
      <div className="settings-container">
        {/* Header */}
        <header className="settings-header">
          <Link to="/chat" className="back-btn">
            <FaArrowLeft />
            Back to Chat
          </Link>
          <div className="header-center">
            <FaShieldAlt className="logo-icon" />
            <span>Settings</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            Logout
          </button>
        </header>

        <div className="settings-main">
          {/* Sidebar */}
          <aside className="settings-sidebar">
            <nav className="settings-nav">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="nav-icon" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="settings-content">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>

            {/* Save Button */}
            <div className="settings-footer">
              <button className="save-btn" onClick={handleSave}>
                <FaSave />
                Save Settings
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;

