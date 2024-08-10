import React from 'react';
import './Emergency.css';

const Emergency = () => {
  const handleCallEmergency = () => {
    window.location.href = 'tel:112'; // Replace with the actual emergency number
  };

  const handleSendAlert = () => {
    // Add logic to send an alert to emergency contacts
    alert('Alert sent to emergency contacts!');
  };

  return (
    <div className="emergency-page">
      <div className="container">
        <div className="emergency-header">
          <h1>EMERGENCY</h1>
        </div>
        <div className="emergency-buttons">
     
          <button className="emergency-button alert-button" onClick={handleSendAlert}>
            Send Alert
          </button>
        </div>
        <div className="emergency-info">
          <h2>Important Information</h2>
          <ul>
            <li>Stay calm and try to move to a safe location.</li>
            <li>Call immediately if you are in danger.</li>
            <li>Send alerts to your trusted contacts if needed.</li>
            <li>Share your location with emergency services.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
