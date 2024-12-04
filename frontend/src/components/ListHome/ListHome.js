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
    <div className="list-home">
      <h1>List of Homes</h1>

      {/* Location Error Message */}
      {locationError && (
        <p className="error">Error fetching location: {locationError}</p>
      )}

      {/* Filter Options */}
      <div className="filters">
        <label htmlFor="filter">Filter by:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="none">None</option>
          <option value="cheapest">Cheapest</option>
          <option value="closest">Closest</option>
        </select>
      </div>

      <ul className="home-list">
        {filteredHouses.map((house) => (
          <li key={house.id} className="home-item">
            <h2 className="home-title">{house.title}</h2>
            <p>Type: {house.type}</p>
            <p>Price: ${house.price}</p>
            <p>Bedrooms: {house.bedrooms}</p>
            <p>Bathrooms: {house.baths}</p>
            <p>Availability: {house.availability}</p>
            <p>Utilities Included: {house.utilities_included ? 'Yes' : 'No'}</p>
            <p>Cats Allowed: {house.cats ? 'Yes' : 'No'}</p>
            <p>Dogs Allowed: {house.dogs ? 'Yes' : 'No'}</p>
            <p>
              Features:{' '}
              {house.features.length > 0 ? (
                <ul>
                  {house.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              ) : (
                'None'
              )}
            </p>
            <p>Address: {house.address}</p>
            <p>City: {house.city}</p>
            <p>Province: {house.province}</p>
            <p>Location: {house.location}</p>
            {userLocation && (
              <p>
                Distance: {calculateDistance({ lat: house.latitude, lng: house.longitude }).toFixed(2)} km
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListHome;
