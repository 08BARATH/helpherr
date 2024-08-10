import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Signup.css';
import logo from '../assets/logo.png';

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phonenumber: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { ...formData };

    try {
      const response = await axios.post('http://localhost:8080/login', payload);
      if (response.data.success) {
        console.log('Registration successful:', response.data);
        // Navigate to the login page
        window.location.href = '/user-login';
      } else {
        console.error('Registration failed:', response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error('There was an error registering!', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="background">
      <div className="signup-container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="signup-header">
            <img src={logo} alt="Logo" className="login-logo" />
            <h1>Sign Up</h1>
          </div>
          <form onSubmit={handleSubmit} noValidate style={{ width: '100%', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={{ flex: '0 0 48%' }}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                style={{ flex: '0 0 48%' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="tel"
                name="phonenumber"
                placeholder="Phone Number"
                value={formData.phonenumber}
                onChange={handleChange}
                required
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ width: '100%' }}
              />
            </div>
            <button type="submit">
              Sign Up
            </button>
          </form>
          <div className="login-link">
            <p>Already have an account?</p>
            <Link to="/user-login">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
