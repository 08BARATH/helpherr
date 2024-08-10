import React, { useState } from 'react';
import axios from 'axios';
import './Cybercrime.css';

const Cybercrime = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phoneNumber: '',
    complaintText: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    axios.post('http://localhost:8080/api/complaints', formData)
      .then(response => {
        console.log('Complaint submitted successfully:', response.data);
        setFormData({
          name: '',
          age: '',
          phoneNumber: '',
          complaintText: '',
        });
        setSuccess('Complaint submitted successfully!');
      })
      .catch(error => {
        console.error('There was an error submitting the complaint!', error);
        if (error.response) {
          setError(`Error: ${error.response.status} ${error.response.data}`);
        } else if (error.request) {
          setError('Error: No response received from server.');
        } else {
          setError(`Error: ${error.message}`);
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="cyber-complaint-page">
      <div className="cyber-complaint-container">
        <h4>File a Cyber Complaint</h4>
        <form onSubmit={handleSubmit} className="complaint-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <textarea
            name="complaintText"
            placeholder="Complaint Text"
            value={formData.complaintText}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default Cybercrime;
