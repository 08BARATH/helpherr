import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Mainpage.css'; // Make sure you have this CSS file
import { Link } from 'react-router-dom';

const Mainpage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="main-page">
      <div className="header">
        <h1>SERVICES</h1>
        <Link to="/user-login"><img src={require('../assets/logout.png')} alt="logout" className='logo-image2' /></Link>
      </div>
      <div className="services-section">
        {/* <h2>SERVICES</h2> */}
        <div className="services">
          <button className="service-circle" onClick={() => handleNavigate('/bike-ride')}>
            <img src={require('../assets/bike1.png')} alt="Bike Ride" />
            <p>Bike Ride</p>
          </button>
          <button className="service-circle" onClick={() => handleNavigate('/food-delivery')}>
            <img src={require('../assets/food.png')} alt="Food Delivery" />
            <p>Pick and Drop</p>
          </button>
          <button className="service-circle" onClick={() => handleNavigate('/rooms')}>
            <img src={require('../assets/rooms.png')} alt="Rooms" />
            <p>Rooms</p>
          </button>
          <button className="service-circle" onClick={() => handleNavigate('/menstruals')}>
            <img src={require('../assets/menstrual.png')} alt="Menstruals" />
            <p>Menstruals</p>
          </button>
          <button className="service-circle" onClick={() => handleNavigate('/pregnancy')}>
            <img src={require('../assets/pregnancy.png')} alt="Pregnancy" />
            <p>Pregnancy</p>
          </button>
          <button className="service-circle" onClick={() => handleNavigate('/cybercrime')}>
            <img src={require('../assets/cybercrime.png')} alt="Cyber Crime" />
            <p>Cyber Crime</p>
          </button>
          <button className="service-circle" onClick={() => handleNavigate('/mental')}>
            <img src={require('../assets/mental.png')} alt="Mental Counselling" />
            <p>Mental Counselling</p>
          </button>
          <button className="service-circle" onClick={() => handleNavigate('/fitness')}>
            <img src={require('../assets/fitness.png')} alt="Fitness" />
            <p>Fitness</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
