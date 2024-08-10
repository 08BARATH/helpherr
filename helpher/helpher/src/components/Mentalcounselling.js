import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import whats from '../assets/whatsapp-logo.jpg';
import './doctor.css';

const DoctorCard = () => {
  return (
    <div className="bg">
      

      <div className="grid">
        <h4 className="title" align="center">OUR DOCTOR's</h4>
        <div className="doctor-container">
          <div className="doctor-card">
            <img
              src="https://img.freepik.com/premium-photo/smiling-female-doctor-with-eyeglasses-looking-camera-isolated-white_970631-2329.jpg"
              alt="Doctor"
              className="doctor-image"
            />
            <h6 className="doctor-name">Dr. Poovizhi</h6>
            <p className="doctor-specialty">Psychiatrists</p>
            <a href="https://wa.me/+919894552798" className="whatsapp-link">
              <div className="card-icon">
                <img
                  src={whats}
                  alt="WhatsApp"
                  className="whatsapp-image"
                />
                <p>WhatsApp</p>
              </div>
            </a>
          </div>

          <div className="doctor-card">
            <img
              src="https://i.pinimg.com/736x/c5/a3/90/c5a3904b38eb241dd03dd30889599dc4.jpg"
              alt="Doctor"
              className="doctor-image"
            />
            <h6 className="doctor-name">Dr. Kaavya</h6>
            <p className="doctor-specialty">Psychiatrists</p>
            <a href="https://wa.me/+919159954311" className="whatsapp-link">
              <div className="card-icon">
                <img
                  src={whats}
                  alt="WhatsApp"
                  className="whatsapp-image"
                />
                <p>WhatsApp</p>
              </div>
            </a>
          </div>

          <div className="doctor-card">
            <img
              src="https://img.freepik.com/premium-photo/medical-concept-indian-beautiful-female-doctor-white-coat-with-stethoscope-waist-up-medical_396607-81768.jpg"
              alt="Doctor"
              className="doctor-image"
            />
            <h6 className="doctor-name">Dr. Lakshana</h6>
            <p className="doctor-specialty">Psychiatrists</p>
            <a href="https://wa.me/+919843873343" className="whatsapp-link">
              <div className="card-icon">
                <img
                  src={whats}
                  alt="WhatsApp"
                  className="whatsapp-image"
                />
                <p>WhatsApp</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
