import React, { useState, useEffect } from 'react';
import './styles/Map.css';
const Map = () => {
  const [location, setLocation] = useState({ lat: 53.5176331, lng: -113.5017984 });

  useEffect(() => {
    // Initialize Google Map here with location state
    const google = window.google;
    
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: location,
    });

    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: 'Your location',
    });
  }, [location]);

  return (
    <div className="map-container">
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <div>
        <button onClick={() => setLocation({ lat: 53.5176331, lng: -113.5017984 })}>Set Location</button>
      </div>
    </div>
  );
};

export default Map;
