/* global chrome */
import React, { useState } from 'react';
import './Personalized.css';

const Personalize = ({ submitPreferences }) => {
  const [preferences, setPreferences] = useState({
    rooms: 1,
    pets: false,
    budget: 1000,
    washrooms: 1,
    propertyType: 'Apartment',
    preferredLocations: '',
    parking: false,
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

    const houseData = [
        { lat: 53.5461, lng: -113.4938, name: 'House A', price: '$1200/month' },
        { lat: 53.5444, lng: -113.4909, name: 'House B', price: '$900/month' },
    ];

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
        // submitPreferences(data.listings); // Call submitPreferences with the scraped listings
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

    submitPreferences(preferences);
};

return (
  <div className="personalize-section">
    <div className="chrome-card">
      <div className="content-wrapper">
        {/* Header */}
        <div className="extension-header fade-in">
          <div className="logo-container">
            <img src="../images/icon.png" alt="HomeHop Extension" className="extension-logo" />
            <div className="chrome-badge">Chrome Extension</div>
          </div>
          <h1>Customize Your Search</h1>
          <p className="subtitle">Tell us what you're looking for</p>
          <div className="divider"></div>
        </div>

        {/* Form */}
        <form className="preferences-form slide-up" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Basic Info Section */}
            <div className="form-section">
              <h2>Basic Information</h2>
              <div className="input-group">
                <label>
                  Budget
                  <div className="input-with-icon">
                    <span className="currency-symbol">$</span>
                    <input
                      type="number"
                      name="budget"
                      value={preferences.budget}
                        onChange={handleChange}
                        min="0"
                        step="100"
                      />
                    </div>
                  </label>
                </div>

                <div className="input-group">
                  <label>
                    Property Type
                    <select name="propertyType" value={preferences.propertyType} onChange={handleChange}>
                      <option value="Apartment">Apartment</option>
                      <option value="House">House</option>
                      <option value="Studio">Studio</option>
                      <option value="Condo">Condo</option>
                    </select>
                  </label>
                </div>
              </div>

              {/* Features Section */}
              <div className="form-section">
                <h2>Features</h2>
                <div className="number-inputs">
                  <label>
                    Bedrooms
                    <input
                      type="number"
                      name="rooms"
                      value={preferences.rooms}
                      onChange={handleChange}
                      min="0"
                    />
                  </label>
                  <label>
                    Bathrooms
                    <input
                      type="number"
                      name="washrooms"
                      value={preferences.washrooms}
                      onChange={handleChange}
                      min="0"
                    />
                  </label>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="pets"
                      checked={preferences.pets}
                      onChange={handleChange}
                    />
                    <span>Pet Friendly</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox"
                      name="parking"
                      checked={preferences.parking}
                      onChange={handleChange}
                    />
                    <span>Parking Required</span>
                  </label>
                </div>
              </div>

              {/* Location Section */}
              <div className="form-section full-width">
                <h2>Location Preferences</h2>
                <div className="input-group">
                  <label>
                    Preferred Locations
                    <input
                      type="text"
                      name="preferredLocations"
                      placeholder="e.g., Downtown, West End"
                      value={preferences.preferredLocations}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <button
                  type="button"
                  className={`location-button ${preferences.useCurrentLocation ? 'active' : ''}`}
                  onClick={handleLocationToggle}
                >
                <svg viewBox="0 0 24 24" className="location-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                  </svg>
                  {preferences.useCurrentLocation ? 'Location Enabled' : 'Use Current Location'}
                </button>
                </div>
            </div>

            <button type="submit" className="cta-button">
              <span className="button-content">
                Find My Perfect Home
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </form>
        </div>
      </div>  
    </div>
  );
};

export default Personalize;
