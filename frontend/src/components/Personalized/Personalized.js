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
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const houseData = [
        { lat: 53.5461, lng: -113.4938, name: 'House A', price: '$1200/month' },
        { lat: 53.5444, lng: -113.4909, name: 'House B', price: '$900/month' },
    ];

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
      <h1>Personalize Your Search</h1>
      <p>Fill out the details below to customize your property search.</p>
      <form className="personalize-form" onSubmit={handleSubmit}>
        <label>
          Rooms:
          <input type="number" name="rooms" value={preferences.rooms} onChange={handleChange} />
        </label>
        <label>
          Pets Allowed:
          <input type="checkbox" name="pets" checked={preferences.pets} onChange={handleChange} />
        </label>
        <label>
          Budget:
          <input type="number" name="budget" value={preferences.budget} onChange={handleChange} />
        </label>
        <label>
          Washrooms:
          <input type="number" name="washrooms" value={preferences.washrooms} onChange={handleChange} />
        </label>
        <label>
          Property Type:
          <select name="propertyType" value={preferences.propertyType} onChange={handleChange}>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Studio">Studio</option>
            <option value="Condo">Condo</option>
          </select>
        </label>
        <label>
          Preferred Locations:
          <input
            type="text"
            name="preferredLocations"
            placeholder="Enter locations (e.g., Downtown, Suburbs)"
            value={preferences.preferredLocations}
            onChange={handleChange}
          />
        </label>
        <label>
          Parking Required:
          <input type="checkbox" name="parking" checked={preferences.parking} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Personalize;
