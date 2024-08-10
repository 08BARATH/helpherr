import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './Navbar.css'; // Ensure you have this CSS file for styling
import logo from '../assets/logo2.jpg'; // Path to your logo image

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo-image" /> {/* Logo image */}
          HELP HER
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li>
          <button className="emergency"><Link to="/emergency">Emergency</Link></button>
        </li>
        {/* Add more links as necessary */}
      </ul>
    </nav>
  );
};

export default Navbar;
