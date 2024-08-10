import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Box, Button, Typography } from '@mui/material';
import { useLoadScript } from '@react-google-maps/api';
import napkinbg from '../assets/napkin.png';
import { useNavigate } from 'react-router-dom';

const libraries = ['places'];

const NapkinDelivery = () => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (!isLoaded) return;

    const autocompleteService = new window.google.maps.places.AutocompleteService();

    const fetchOptions = (input) => {
      if (input === '') {
        setOptions([]);
        return;
      }

      autocompleteService.getPlacePredictions({ input }, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setOptions(predictions.map((prediction) => ({
            label: prediction.description,
            placeId: prediction.place_id,
          })));
        } else {
          setOptions([]);
        }
      });
    };

    fetchOptions(inputValue);
  }, [inputValue, isLoaded]);

  const handlePlaceSelect = (event, value, type) => {
    if (value) {
      if (type === 'destination') {
        setDestinationLocation(value.label);
      } else {
        setPickupLocation(value.label);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const deliveryRequest = {
      pickupLocation,
      destinationLocation,
      email,
      username,
    };

    try {
      const response = await fetch('http://localhost:8080/api/delivery-requests/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deliveryRequest),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Delivery request created:', data);

      // Redirect or perform other actions after successful creation
      navigate('/NapkinOrderConfirmation');
    } catch (error) {
      console.error('Error creating delivery request:', error);
    }
  };

  if (loadError) return <div>Error loading Google Maps API</div>;

  return (
    <div style={{ display: 'flex', width: '100%', height: '600px', backgroundColor: '#FFC0CB' }}>
      <div style={{ flex: 2, padding: '10px' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.472888122254!2d76.92319257408951!3d10.927606756388924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85b823c4ca3d5%3A0x23416a992879b7c4!2sSri%20Krishna%20College%20Of%20Technology!5e0!3m2!1sen!2sin!4v1721919285291!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div style={{ flex: 1, padding: '20px', borderLeft: '1px solid #ccc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={napkinbg}
          alt="Napkin"
          style={{ borderRadius: '50px', marginTop:'20px' }}
          height="160px"
          width="170px"
        />
        <Typography variant="h4" gutterBottom>Order Menstrual Napkins</Typography>
        <Box component="form" width="100%" maxWidth="400px" display="flex" flexDirection="column" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Autocomplete
            freeSolo
            options={options}
            getOptionLabel={(option) => option.label || ''}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
            onChange={(event, value) => handlePlaceSelect(event, value, 'destination')}
            renderInput={(params) => (
              <TextField {...params} label="Enter Delivery Address" variant="outlined" margin="normal" fullWidth />
            )}
          />
          <Autocomplete
            freeSolo
            options={options}
            getOptionLabel={(option) => option.label || ''}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
            onChange={(event, value) => handlePlaceSelect(event, value, 'pickup')}
            renderInput={(params) => (
              <TextField {...params} label="Enter Pickup Location (if different)" variant="outlined" margin="normal" fullWidth />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            style={{ padding: '15px', fontSize: '18px', borderRadius: '8px', backgroundColor: '#ca6877', marginTop: '20px' }}
          >
            Order Now
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default NapkinDelivery;
