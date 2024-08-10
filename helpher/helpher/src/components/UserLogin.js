import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Login.css';
import logo from '../assets/logo.png';
import googleLogo from '../assets/google-logo.jpg'; // Path to Google logo
import facebookLogo from '../assets/facebook-logo.jpg';
import axios from 'axios'; // import axios for API calls

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:8080/login/check', payload);
      if (response.data.success) {
        if (response.data.role === 'admin') {
          console.log('Admin login successful:', response.data);
          // Navigate to the admin page
          navigate('/admin-dashboard');
        } else {
          console.log('User login successful:', response.data);
          // Navigate to the main page
          navigate('/main');
        }
      } else {
        console.error('Login failed:', response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <img src={logo} alt="Logo" className="login-logo" />
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email" className="login-form-label1">Email:</label>
            <input
              type="email"
              id="email"
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-form-input"
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="password" className="login-form-label">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-form-input"
            />
          </div>
          <Link to="/forgot-password" className="login-forgot-password">Forgot your password?</Link>
          <button type="submit" className="login-submit-button">LOGIN</button>
        </form>
        <div className="login-signup-link">
          <p>Don't have an account?</p>
          <Link to="/signup">Sign Up</Link>
        </div>
        <div className="login-social-login">
          <span>Or log in with</span>
          <div className="login-social-icons">
            <Link to="#" className="login-social-icon">
              <img src={googleLogo} alt="Google" />
            </Link>
            <Link to="#" className="login-social-icon">
              <img src={facebookLogo} alt="Facebook" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
