import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // Rename to register.css if styling differs

import loginImg from '../assets/images/glitch-art.png';
import userIcon from '../assets/images/glitch-user.png';

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '', // Added phoneNumber field
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.text();

      if (data === 'User registered successfully') {
        setSuccess('Registration successful!');
        setTimeout(() => {
          navigate('/profile', { state: credentials }); // Navigate to Profile page with user data
        }, 2000);
      } else {
        setError(data);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="glitch-login-section">
      <div className="glitch-login-container">
        <div className="glitch-img-side">
          <img src={loginImg} alt="Register" />
          <p className="glitch-quote">"Start your journey. Register now."</p>
        </div>

        <div className="glitch-form-side">
          <div className="user-glitch-icon">
            <img src={userIcon} alt="User Icon" />
          </div>
          <h2 className="glitch-text" data-text="Create Account">Register</h2>

          {error && <p className="glitch-error">{error}</p>}
          {success && <p className="glitch-success">{success}</p>}

          <Form onSubmit={handleClick}>
            <FormGroup>
              <input
                type="text"
                placeholder="Username"
                required
                id="username"
                value={credentials.username}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <input
                type="email"
                placeholder="Email"
                required
                id="email"
                value={credentials.email}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <input
                type="password"
                placeholder="Password"
                required
                id="password"
                value={credentials.password}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <input
                type="text"
                placeholder="Phone Number"
                id="phoneNumber"
                value={credentials.phoneNumber}
                onChange={handleChange}
              />
            </FormGroup>

            <Button className="glitch-btn" type="submit">
              Register
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Register;
