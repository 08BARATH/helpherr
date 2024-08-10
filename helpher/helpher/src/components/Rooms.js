import React, { useState } from 'react';
import './room.css';

const RoomBooking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roomType: '',
    checkInDate: '',
    checkOutDate: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Booking data submitted successfully:', data);
        setSuccess('Booking successful!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          roomType: '',
          checkInDate: '',
          checkOutDate: '',
        });
      } else {
        const errorData = await response.json();
        console.error('Error submitting booking data:', errorData);
        setError(`Error: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting booking data:', error);
      setError('Error submitting booking data');
    }
  };

  const roomTypes = [
    'Single Room',
    'Double Room',
    'Suite',
    'Deluxe Room',
  ];

  return (
    <div className="room-booking-page">
      <div className="room-booking-container">
        <h4>Book a Room</h4>
        <form onSubmit={handleSubmit} className="bookingform">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Room Type</option>
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            required
          />
          <button type="submit">Book Now</button>
        </form>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default RoomBooking;
