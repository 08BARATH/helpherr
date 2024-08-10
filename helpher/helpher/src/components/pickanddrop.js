import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Box, Button, Typography } from '@mui/material';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import napkinbg from '../assets/pickdrop.png';
import { Link } from 'react-router-dom';
import './Map.css';

const libraries = ['places'];

const FemaleDeliveryService = () => {
  const [pickupOptions, setPickupOptions] = useState([]);
  const [dropOptions, setDropOptions] = useState([]);
  const [pickupInput, setPickupInput] = useState('');
  const [dropInput, setDropInput] = useState('');
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);
  const [userName, setUserName] = useState('');

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (!isLoaded) return;

    console.log('Google Maps API Loaded');

    const autocompleteService = new window.google.maps.places.AutocompleteService();

    const fetchOptions = (input, setOptions) => {
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

    fetchOptions(pickupInput, setPickupOptions);
    fetchOptions(dropInput, setDropOptions);
  }, [pickupInput, dropInput, isLoaded]);

  const handlePickupSelect = (event, value) => {
    if (value) {
      const place = new window.google.maps.places.PlacesService(document.createElement('div'));
      place.getDetails({ placeId: value.placeId }, (result) => {
        if (result) {
          setPickupLocation({
            label: result.formatted_address,
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng(),
          });
        }
      });
    }
  };

  const handleDropSelect = (event, value) => {
    if (value) {
      const place = new window.google.maps.places.PlacesService(document.createElement('div'));
      place.getDetails({ placeId: value.placeId }, (result) => {
        if (result) {
          setDropLocation({
            label: result.formatted_address,
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng(),
          });
        }
      });
    }
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    if (!pickupLocation) {
      setPickupLocation({ label: `Lat: ${lat}, Lng: ${lng}`, lat, lng });
      setPickupInput(`Lat: ${lat}, Lng: ${lng}`);
    } else if (!dropLocation) {
      setDropLocation({ label: `Lat: ${lat}, Lng: ${lng}`, lat, lng });
      setDropInput(`Lat: ${lat}, Lng: ${lng}`);
    }
  };

  const handleSubmit = async () => {
    if (pickupLocation && dropLocation && userName) {
      try {
        const response = await fetch('http://localhost:8080/api/pick-drop-requests/request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pickupLocation: pickupLocation.label,
            destinationLocation: dropLocation.label,
            userId: userName,
          }),
        });
        const result = await response.json();
        console.log('Request saved to backend:', result);
      } catch (error) {
        console.error('Error saving request to backend:', error);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  if (loadError) return <div>Error loading Google Maps API</div>;

  return (
    <div style={{ display: 'flex', width: '100%', height: '600px', backgroundColor: '#FFC0CB' }}>
      <div style={{ flex: 2, padding: '10px' }}>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            zoom={15}
            center={{ lat: pickupLocation?.lat || 10.927606756388924, lng: pickupLocation?.lng || 76.92319257408951 }}
            onClick={handleMapClick}
          >
            {pickupLocation && <Marker position={{ lat: pickupLocation.lat, lng: pickupLocation.lng }} />}
            {dropLocation && <Marker position={{ lat: dropLocation.lat, lng: dropLocation.lng }} />}
          </GoogleMap>
        )}
      </div>

      <div style={{ flex: 1, padding: '10px', borderLeft: '1px solid #ccc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={napkinbg}
          alt="Service Logo"
          style={{ margin: '10px 10px', borderRadius: '50px' }}
          height="200px"
          width="300px"
        />
        <Typography variant="h4" gutterBottom>Female Delivery Service</Typography>
        <Box component="form" width="100%" maxWidth="400px" display="flex" flexDirection="column">
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
            options={pickupOptions}
            getOptionLabel={(option) => option.label || ''}
            inputValue={pickupInput}
            onInputChange={(event, newInputValue) => setPickupInput(newInputValue)}
            onChange={handlePickupSelect}
            renderInput={(params) => <TextField {...params} label="Enter Pickup Location" fullWidth sx={{ marginBottom: '10px' }} />}
          />
          <Autocomplete
            freeSolo
            options={dropOptions}
            getOptionLabel={(option) => option.label || ''}
            inputValue={dropInput}
            onInputChange={(event, newInputValue) => setDropInput(newInputValue)}
            onChange={handleDropSelect}
            renderInput={(params) => <TextField {...params} label="Enter Drop Location" fullWidth />}
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            style={{ padding: '15px', fontSize: '18px', borderRadius: '8px', backgroundColor: '#ca6877', marginTop: '20px' }}
          >
            Complete It
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default FemaleDeliveryService;
