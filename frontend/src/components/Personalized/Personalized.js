/* global chrome */
import React, { useState } from 'react';
import './Personalized.css';

const Personalize = ({ submitPreferences }) => {
  const [preferences, setPreferences] = useState({

    // Default preferences based on the data example
    available: 'Immediate',
    baths: '2',
    bedrooms: '2',
    cats: true,
    dogs: true,
    features: ['Dishwasher', 'In-suite Storage', 'Laundry - Shared', 'Balcony'],
    price: '1435',
    type: 'Apartment',
    utilities_included: false,
    useCurrentLocation: false,
    currentLocation: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFeaturesChange = (e) => {
    const options = e.target.options;
    const selectedFeatures = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedFeatures.push(options[i].value);
      }
    }
    setPreferences({
      ...preferences,
      features: selectedFeatures,
    });
  };

  const handleLocationToggle = () => {
    if (!preferences.useCurrentLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const currentLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            console.log('Current Location:', currentLocation);
            setPreferences({
              ...preferences,
              useCurrentLocation: true,
              currentLocation: currentLocation,
            });
            
            // Send this location to the backend endpoint
            fetch('http://localhost:5000/location', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(currentLocation),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log('Location update response:', data);
              })
              .catch((error) => {
                console.error('Error updating location:', error);
              });
          },
          (error) => {
            console.error('Error getting current location:', error);
            setPreferences({
              ...preferences,
              useCurrentLocation: false,
              currentLocation: null,
            });
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        setPreferences({
          ...preferences,
          useCurrentLocation: false,
          currentLocation: null,
        });
      }
    } else {
      setPreferences({
        ...preferences,
        useCurrentLocation: false,
        currentLocation: null,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const houseData = [];

    // const houseData = [
    //     { lat: 53.5461, lng: -113.4938, name: 'House A', price: '$1200/month' },
    //     { lat: 53.5444, lng: -113.4909, name: 'House B', price: '$900/month' },
    // ];

    // Send request to backend to start scraping
    fetch('http://localhost:5000/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ startScraping: true, preferences }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Scraping response:', data);
        houseData.push(data);
        
      })
      .catch((error) => {
        console.error('Error starting scraping:', error);
      });

    

    // Open Google Maps first
    chrome.runtime.sendMessage({ type: "OPEN_GOOGLE_MAPS" }, (response) => {
        if (chrome.runtime.lastError) {
            console.error("Error opening Google Maps:", chrome.runtime.lastError.message);
        } else if (response && response.success) {
            console.log("Google Maps opened successfully!");

            // Send house data to the background script
            chrome.runtime.sendMessage({ type: "ADD_MARKERS", payload: houseData }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Error sending markers:", chrome.runtime.lastError.message);
                } else if (response && response.success) {
                    console.log("House data sent successfully!");
                } else {
                    console.error("Failed to send house data. Response:", response);
                }
            });
        }
    });

    submitPreferences(preferences, houseData);
};

  return (
    <div className="personalize-section">
      <h1>Personalize Your Search</h1>
      <p>Fill out the details below to customize your property search.</p>
      <form className="personalize-form" onSubmit={handleSubmit}>
        <label>
          Available:
          <input type="text" name="available" value={preferences.available} onChange={handleChange} />
        </label>
        <label>
          Baths:
          <input type="range" name="baths" min="1" max="10" value={preferences.baths} onChange={handleChange} />
          <span>{preferences.baths}</span>
        </label>
        <label>
          Bedrooms:
          <input type="range" name="bedrooms" min="1" max="10" value={preferences.bedrooms} onChange={handleChange} />
          <span>{preferences.bedrooms}</span>
        </label>
        <label>
          Cats Allowed:
          <input type="checkbox" name="cats" checked={preferences.cats} onChange={handleChange} />
        </label>
        <label>
          Dogs Allowed:
          <input type="checkbox" name="dogs" checked={preferences.dogs} onChange={handleChange} />
        </label>
        <label>
          Features:
          <select multiple={true} value={preferences.features} onChange={handleFeaturesChange}>
            <option value="Dishwasher">Dishwasher</option>
            <option value="In-suite Storage">In-suite Storage</option>
            <option value="Laundry - Shared">Laundry - Shared</option>
            <option value="Balcony">Balcony</option>
            <option value="Air Conditioning">Air Conditioning</option>
            <option value="Elevator">Elevator</option>
            <option value="Parking">Parking</option>
          </select>
        </label>
        <label>
          Price:
          <input type="range" name="price" min="0" max="10000" value={preferences.price} onChange={handleChange} />
          <span>{preferences.price}</span>
        </label>
        <label>
          Type:
          <select name="type" value={preferences.type} onChange={handleChange}>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Studio">Studio</option>
            <option value="Condo">Condo</option>
          </select>
        </label>
        <label>
          Utilities Included:
          <input type="checkbox" name="utilities_included" checked={preferences.utilities_included} onChange={handleChange} />
        </label>
        <label>
          Use Current Location:
          <button type="button" onClick={handleLocationToggle}>
            {preferences.useCurrentLocation ? 'Disable' : 'Enable'}
          </button>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Personalize;
