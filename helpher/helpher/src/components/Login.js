import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Login.css'; // Adjust the path as necessary
import logo from '../assets/logo.png'; // Path to your logo
import googleLogo from '../assets/google-logo.jpg'; // Path to Google logo
import facebookLogo from '../assets/facebook-logo.jpg'; // Path to Facebook logo

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    localStorage.setItem('username', username);
    navigate('/main'); // Navigate to the main page after login
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <img src={logo} alt="Logo" className="login-logo" /> {/* Added logo */}
          <h2>LOG IN</h2>
        </div>
      
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="username" className="login-form-label">Username:</label>
            <input
              type="text"
              id="username"
              placeholder='Enter your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <span>Or </span>
          <span>log in with</span>
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

export default Login;
