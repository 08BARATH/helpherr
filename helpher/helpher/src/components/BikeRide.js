import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Box, Button, Typography } from '@mui/material';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import bikebg from '../assets/bike.png';
import { useNavigate } from 'react-router-dom';
import './Map.css'; // Import the CSS file

const libraries = ['places'];

const Map = () => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [pickUpPoint, setPickUpPoint] = useState(null);
  const [destinationPoint, setDestinationPoint] = useState(null);
  const [userName, setUserName] = useState('');
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
      if (type === 'pickUp') {
        setPickUpPoint({ label: value.label, lat: null, lng: null });
      } else {
        setDestinationPoint({ label: value.label, lat: null, lng: null });
      }
    }
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    if (!pickUpPoint) {
      setPickUpPoint({ label: `Lat: ${lat}, Lng: ${lng}`, lat, lng });
    } else if (!destinationPoint) {
      setDestinationPoint({ label: `Lat: ${lat}, Lng: ${lng}`, lat, lng });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ride = {
      pickupLocation: pickUpPoint ? pickUpPoint.label : '',
      destinationLocation: destinationPoint ? destinationPoint.label : '',
      userId: userName, // Assuming userName is used as userId
    };

    try {
      console.log('Submitting ride:', ride);
      const response = await fetch('http://localhost:8080/api/ride-requests/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ride),
      });

      console.log('Response:', response);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Ride created:', data);

      // Redirect or do something after successful creation
      navigate('/pickme');
    } catch (error) {
      console.error('Error creating ride:', error);
    }
  };

  if (loadError) return <div>Error loading Google Maps API</div>;

  return (
    <div className="bike-ride-page">
      <Box className="map-container">
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            zoom={15}
            center={{ lat: 10.927606756388924, lng: 76.92319257408951 }}
            onClick={handleMapClick}
          >
            {pickUpPoint && <Marker position={{ lat: pickUpPoint.lat, lng: pickUpPoint.lng }} />}
            {destinationPoint && <Marker position={{ lat: destinationPoint.lat, lng: destinationPoint.lng }} />}
          </GoogleMap>
        )}
      </Box>

      <Box className="booking-form">
        <img
          src={bikebg}
          alt="Bike Icon"
          style={{ margin: '10px 0', borderRadius: '0%', marginBottom: '20px' }}
          height="150px"
          width="150px"
        />
        <Typography variant="h4" gutterBottom>Book a Ride</Typography>
        <Box component="form" width="100%" maxWidth="400px" display="flex" flexDirection="column" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Autocomplete
            freeSolo
            options={options}
            getOptionLabel={(option) => option.label || ''}
            inputValue={pickUpPoint ? pickUpPoint.label : inputValue}
            onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
            onChange={(event, value) => handlePlaceSelect(event, value, 'pickUp')}
            renderInput={(params) => (
              <TextField {...params} label="Enter Pick Up Point" variant="outlined" margin="normal" fullWidth />
            )}
          />
          <Autocomplete
            freeSolo
            options={options}
            getOptionLabel={(option) => option.label || ''}
            inputValue={destinationPoint ? destinationPoint.label : inputValue}
            onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
            onChange={(event, value) => handlePlaceSelect(event, value, 'destination')}
            renderInput={(params) => (
              <TextField {...params} label="Enter Destination" variant="outlined" margin="normal" fullWidth />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            style={{ padding: '15px', fontSize: '18px', borderRadius: '8px', backgroundColor: '#E37383', marginTop: '20px' }}
          >
            Pick Me
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Map;
