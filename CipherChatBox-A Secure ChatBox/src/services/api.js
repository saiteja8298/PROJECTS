// API service for communicating with Python backend
const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  // Helper method to make API requests
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async register(userData) {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Encryption endpoints
  async encryptMessage(text, key, cipher = 'AES') {
    return this.request('/encrypt', {
      method: 'POST',
      body: JSON.stringify({ text, key, cipher }),
    });
  }

  async decryptMessage(encryptedText, key, cipher = 'AES') {
    return this.request('/decrypt', {
      method: 'POST',
      body: JSON.stringify({ encrypted_text: encryptedText, key, cipher }),
    });
  }

  // Utility endpoints
  async getCiphers() {
    return this.request('/ciphers');
  }

  async generateKey() {
    return this.request('/generate-key', {
      method: 'POST',
    });
  }

  async healthCheck() {
    return this.request('/health');
  }
}

// Create singleton instance
const apiService = new ApiService();
export default apiService;

