import React, { useState, useEffect } from 'react';
import './ListHome.css';

const ListHome = ({ houses }) => {
  const [filter, setFilter] = useState('none'); // State to manage the selected filter
  const [userLocation, setUserLocation] = useState(null); // State to store user location
  const [locationError, setLocationError] = useState(null); // State for location error
  console.log(houses);

  //houses is of the formtat {}

  // Fetch user location on component mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        setLocationError(error.message);
      }
    );
  }, []);

  const calculateDistance = (houseLocation) => {
    if (!userLocation) return Infinity; // If user location is not available, return a high value

    const toRadians = (deg) => (deg * Math.PI) / 180;
    const earthRadiusKm = 6371;

    const dLat = toRadians(houseLocation.lat - userLocation.lat);
    const dLng = toRadians(houseLocation.lng - userLocation.lng);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(userLocation.lat)) *
        Math.cos(toRadians(houseLocation.lat)) *
        Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c; // Distance in kilometers
  };

  const getFilteredHouses = () => {
    if (filter === 'cheapest') {
      return [...houses].sort((a, b) => a.price - b.price);
    }
    if (filter === 'closest') {
      return [...houses].sort(
        (a, b) => calculateDistance(a.location) - calculateDistance(b.location)
      );
    }
    return houses; // Default: no sorting
  };


  const filteredHouses = getFilteredHouses();




  return (
    <div className="listhome-section">
      <div className="chrome-card">
        <div className="content-wrapper">
          {/* Header */}
          <div className="extension-header fade-in">
            <div className="logo-container">
              <img src="../images/icon.png" alt="HomeHop Extension" className="extension-logo" />
              <div className="chrome-badge">Chrome Extension</div>
            </div>
            <h1>Available Properties</h1>
            <p className="subtitle">Found {listings.length} properties matching your criteria</p>
            <div className="divider"></div>
          </div>

          {/* Listings Grid */}
          <div className="listings-container slide-up">
            {loading ? (
              <div className="loading-overlay">
                <div className="loading-spinner"></div>
              </div>
            ) : listings.length > 0 ? (
              <div className="listings-grid">
                {listings.map((listing, index) => (
                  <div key={index} className="listing-card">
                    <div className="listing-image">
                      <img src={listing.image || "../images/placeholder-home.png"} alt={listing.title} />
                      <div className="listing-price">${listing.price}</div>
                    </div>
                    <div className="listing-content">
                      <h3 className="listing-title">{listing.title}</h3>
                      <div className="listing-details">
                        <span>{listing.bedrooms} Beds</span>
                        <span>•</span>
                        <span>{listing.baths} Baths</span>
                        <span>•</span>
                        <span>{listing.type}</span>
                      </div>
                      <p className="listing-address">{listing.address}</p>
                      <div className="listing-features">
                        {listing.features && listing.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="feature-tag">{feature}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-listings">
                <svg className="empty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 9V15M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p>No properties found matching your criteria</p>
                <button className="cta-button" onClick={() => window.history.back()}>
                  Modify Search
                </button>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListHome;
