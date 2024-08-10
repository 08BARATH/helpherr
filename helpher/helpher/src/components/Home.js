import React from 'react';
import { Link } from 'react-router-dom';
import '../Home.css'; // Ensure you have this CSS file

const Home = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-content">
          <h1>Welcome to HELP HER!</h1>
          <p>Your Go-To Network for Female Support</p>
          <Link to="/user-login" className="cta-button">Join Us</Link>
        </div>
      </header>
      
      
      <footer className="home-footer">
        <p>&copy; 2024 HelpHer. All rights reserved.</p>
        <Link to="/contact" className="footer-link">Contact Us</Link>
      </footer>
    </div>
  );
};

export default Home;
