import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message || 'Your message has been sent successfully.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        try {
          const errorData = await response.json();
          setError(`Error: ${errorData.message || 'Unknown error occurred'}`);
        } catch (jsonError) {
          const errorText = await response.text();
          setError(`Error: ${errorText}`);
        }
      }
    } catch (networkError) {
      setError(`Error: ${networkError.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-us">
      <div className="contact-form">
        <div className="contact-logo">
          <h2>CONTACT US</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name :</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email :</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Message :</label>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button-contact" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          {success && <p className="success-message">{success}</p>}
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

Contact.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }),
  isSubmitting: PropTypes.bool,
  success: PropTypes.string,
  error: PropTypes.string,
};

export default Contact;
