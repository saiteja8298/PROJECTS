# CipherChat - Secure Encrypted Messaging Platform

A modern, secure messaging platform built with React.js featuring multiple encryption algorithms and a sleek black theme design.

## 🔐 Features

### Security & Encryption
- **Multiple Encryption Algorithms**: AES, DES, TripleDES, RC4, and Blowfish
- **End-to-End Encryption**: Messages encrypted before transmission
- **Custom Encryption Keys**: User-generated secure keys
- **Zero-Knowledge Architecture**: Messages encrypted client-side

### User Interface
- **Modern Black Theme**: Sleek, professional dark design
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Messaging**: Instant message delivery
- **User Management**: Registration, login, and profile management
- **Settings Panel**: Customizable encryption and appearance options

### Technical Features
- **React.js Frontend**: Modern component-based architecture
- **Crypto-JS Integration**: Industry-standard encryption libraries
- **Local Storage**: Secure session management
- **Framer Motion**: Smooth animations and transitions
- **React Router**: Single-page application navigation

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cipherchat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 🎨 Design Features

### Color Scheme
- **Primary**: Deep black (#000000)
- **Secondary**: Dark gray (#1a1a1a)
- **Accent**: Cyan blue (#00d4ff)
- **Text**: White (#ffffff) and light gray (#cccccc)

### UI Components
- **Landing Page**: Hero section with feature highlights
- **Authentication**: Secure login and registration forms
- **Chat Interface**: Real-time messaging with encryption status
- **Settings Panel**: Comprehensive configuration options

## 🔧 Encryption Methods

### Supported Algorithms

1. **AES (Advanced Encryption Standard)**
   - Key Size: 128/192/256 bits
   - Security Level: High
   - Speed: Fast

2. **DES (Data Encryption Standard)**
   - Key Size: 56 bits
   - Security Level: Low
   - Speed: Fast

3. **TripleDES**
   - Key Size: 112/168 bits
   - Security Level: Medium
   - Speed: Medium

4. **RC4 (Rivest Cipher 4)**
   - Key Size: 40-2048 bits
   - Security Level: Medium
   - Speed: Very Fast

5. **Blowfish**
   - Key Size: 32-448 bits
   - Security Level: High
   - Speed: Fast

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with sidebar
- **Tablet**: Adaptive layout with collapsible sidebar
- **Mobile**: Touch-optimized interface with bottom navigation

## 🛠️ Technical Stack

### Frontend
- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Framer Motion**: Animation library
- **Crypto-JS**: Encryption/decryption
- **React Icons**: Icon library
- **React Hot Toast**: Notifications

### Styling
- **CSS3**: Custom styling with modern features
- **Flexbox/Grid**: Responsive layouts
- **CSS Animations**: Smooth transitions
- **Custom Properties**: Theme variables

## 🔒 Security Considerations

### Encryption
- All messages encrypted client-side before transmission
- Multiple encryption algorithms for different security needs
- User-controlled encryption keys
- No server-side message storage

### Authentication
- Local session management
- Secure key generation
- Password validation
- Session persistence

## 📁 Project Structure

```
src/
├── components/
│   ├── Landing.js          # Landing page
│   ├── Login.js            # Login component
│   ├── Register.js         # Registration component
│   ├── Chat.js             # Main chat interface
│   ├── Settings.js         # Settings panel
│   └── *.css               # Component styles
├── utils/
│   └── encryption.js       # Encryption utilities
├── App.js                  # Main app component
├── App.css                 # Global styles
├── index.js                # App entry point
└── index.css               # Base styles
```

## 🎯 Usage

### Getting Started
1. Visit the landing page
2. Create an account or login
3. Set up your encryption key
4. Choose your preferred cipher
5. Start secure messaging!

### Encryption Setup
1. Go to Settings → Security
2. Generate or enter your encryption key
3. Select your preferred cipher algorithm
4. Enable auto-encryption for convenience

### Messaging
1. Select a recipient from the online users list
2. Type your message
3. The message is automatically encrypted
4. Send and receive encrypted messages securely

## 🔮 Future Enhancements

- **Real-time Communication**: WebSocket integration
- **File Encryption**: Secure file sharing
- **Group Chats**: Multi-user conversations
- **Message History**: Encrypted message storage
- **Advanced Security**: Two-factor authentication
- **Mobile App**: React Native version

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**CipherChat** - Secure messaging reimagined with cutting-edge encryption and modern design.

