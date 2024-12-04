/* global chrome */
import React, { useState } from 'react';
import './Personalized.css';

const Personalize = ({ submitPreferences }) => {
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    //define houseData that will be changed later to the actual data
    let houseData = [];


    // const houseData = [
    //     { lat: 53.5461, lng: -113.4938, name: 'House A', price: '$1200/month' },
    //     { lat: 53.5444, lng: -113.4909, name: 'House B', price: '$900/month' },
    // ];

    const scrapeData = async () => {
      try {
        const response = await fetch('http://localhost:5000/scrape', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ startScraping: true, preferences }),
        });
  
        const data = await response.json();
        console.log('Scraping response:', data['listings']);
        return data['listings'];
      } catch (error) {
        console.error('Error starting scraping:', error);
        return [];
      }
    };

    houseData = await scrapeData();
        

    

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
    setLoading(false);
};
  
return (
  <div className="personalize-section">
    <div className={`chrome-card ${loading ? 'loading' : ''}`}>
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
                  Price Range
                  <div className="range-input">
                    <input
                      type="range"
                      name="price"
                      min="0"
                      max="10000"
                      value={preferences.price}
                        onChange={handleChange}
                      />
                      <span className="range-value">${preferences.price}</span>
                    </div>
                  </label>
                </div>

                <div className="input-group">
                  <label>
                    Property Type
                    <select name="type" value={preferences.type} onChange={handleChange}>
                      <option value="Apartment">Apartment</option>
                      <option value="House">House</option>
                      <option value="Studio">Studio</option>
                      <option value="Condo">Condo</option>
                    </select>
                  </label>
                </div>

                <div className="input-group">
                  <label>
                    Availability
                    <select name="available" value={preferences.available} onChange={handleChange}>
                      <option value="Immediate">Immediate</option>
                      <option value="1 Month">1 Month</option>
                      <option value="2 Months">2 Months</option>
                      <option value="3+ Months">3+ Months</option>
                    </select>
                  </label>
                </div>
              </div>

              {/* Features Section */}
              <div className="form-section">
                <h2>Room Details</h2>
                <div className="range-group">
                  <label>
                    Bedrooms
                    <div className="range-input">
                      <input
                        type="range"
                        name="bedrooms"
                        min="1"
                        max="10"
                        value={preferences.bedrooms}
                        onChange={handleChange}
                      />
                      <span className="range-value">{preferences.bedrooms}</span>
                    </div>
                  </label>
                  <label>
                    Bathrooms
                    <div className="range-input">
                      <input
                        type="range"
                        name="baths"
                        min="1"
                        max="10"
                        value={preferences.baths}
                        onChange={handleChange}
                      />
                      <span className="range-value">{preferences.baths}</span>
                    </div>
                  </label>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="cats"
                      checked={preferences.cats}
                      onChange={handleChange}
                    />
                    <span>Cats Allowed</span>
                    </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="dogs"
                      checked={preferences.dogs}
                      onChange={handleChange}
                    />
                    <span>Dogs Allowed</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="utilities_included"
                      checked={preferences.utilities_included}
                      onChange={handleChange}
                    />
                    <span>Utilities Included</span>
                  </label>
                </div>
              </div>

              {/* Features Section */}
              <div className="form-section full-width">
                <h2>Additional Features</h2>
                <div className="features-select">
                  <select 
                    multiple 
                    name="features" 
                    value={preferences.features} 
                    onChange={handleFeaturesChange}
                    >
                    <option value="Dishwasher">Dishwasher</option>
                    <option value="In-suite Storage">In-suite Storage</option>
                    <option value="Laundry - Shared">Laundry - Shared</option>
                    <option value="Balcony">Balcony</option>
                    <option value="Elevator">Elevator</option>
                    <option value="Storage Lockers">Storage Lockers</option>
                    <option value="Zero-Step Entrance">Zero-Step Entrance</option>
                    <option value="Fridge">Fridge</option>
                    <option value="Stove">Stove</option>
                    <option value="Microwave">Microwave</option>
                    <option value="Air Conditioning">Air Conditioning</option>
                    <option value="Internet">Internet</option>
                    <option value="Cable TV">Cable TV</option>
                    <option value="Parking">Parking</option>
                    <option value="Fitness Center">Fitness Center</option>
                    <option value="Swimming Pool">Swimming Pool</option>
                    <option value="Wheelchair Accessible">Wheelchair Accessible</option>
                    <option value="Security Cameras">Security Cameras</option>
                    <option value="On-Site Staff">On-Site Staff</option>
                    <option value="Keyless Entry">Keyless Entry</option>
                    <option value="Security Alarm">Security Alarm</option>
                    <option value="Concierge">Concierge</option>
                  </select>
                  <p className="helper-text">Hold Ctrl/Cmd to select multiple features</p>
                </div>

                <button
                type="button"
                className={`location-button ${preferences.useCurrentLocation ? 'active' : ''}`}
                onClick={handleLocationToggle}
              >
                <svg className="location-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                </svg>
                {preferences.useCurrentLocation ? 'Location Enabled' : 'Use Current Location'}
              </button>
            </div>
          </div>

          <button type="submit" className="cta-button" disabled={loading}>
            <span className="button-content">
              {loading ? 'Finding Homes...' : 'Find My Perfect Home'}
              {!loading && (
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
          </button>
        </form>
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Personalize;
