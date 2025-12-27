import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import Settings from './components/Settings';
import Landing from './components/Landing';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('cipherchat_user');
    const savedAuth = localStorage.getItem('cipherchat_auth');
    
    if (savedUser && savedAuth === 'true') {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('cipherchat_user', JSON.stringify(userData));
    localStorage.setItem('cipherchat_auth', 'true');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('cipherchat_user');
    localStorage.removeItem('cipherchat_auth');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading CipherChat...</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1a1a1a',
                color: '#ffffff',
                border: '1px solid #333333',
              },
            }}
          />
          <Routes>
            <Route 
              path="/" 
              element={
                isAuthenticated ? 
                  <Navigate to="/chat" replace /> : 
                  <Landing />
              } 
            />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                  <Navigate to="/chat" replace /> : 
                  <Login onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/register" 
              element={
                isAuthenticated ? 
                  <Navigate to="/chat" replace /> : 
                  <Register onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/chat" 
              element={
                isAuthenticated ? 
                  <Chat user={user} onLogout={handleLogout} /> : 
                  <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/settings" 
              element={
                isAuthenticated ? 
                  <Settings user={user} onLogout={handleLogout} /> : 
                  <Navigate to="/login" replace />
              } 
            />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
