import React, { useState, useEffect } from 'react';
import './styles/ListApt.css';

const ListApt = () => {
  const [apartments, setApartments] = useState([]);
  const [filters, setFilters] = useState({ price: 1000, bedrooms: 2 });

  useEffect(() => {
    // Fetch apartments data (dummy data for now)
    const fetchedApartments = [
      { id: 1, price: 900, bedrooms: 2, location: 'Strathcona', image: 'https://via.placeholder.com/150' },
      { id: 2, price: 1200, bedrooms: 3, location: 'Garneau', image: 'https://via.placeholder.com/150' },
    ];
    setApartments(fetchedApartments);
  }, []);

  return (
    <div className="list-apt-container">
      <div className="filters">
        <label>Price: </label>
        <input
          type="range"
          min="0"
          max="5000"
          value={filters.price}
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
        />
        <label>Bedrooms: </label>
        <input
          type="number"
          value={filters.bedrooms}
          onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
        />
      </div>

      <div className="apartment-list">
        {apartments
          .filter((apt) => apt.price <= filters.price && apt.bedrooms >= filters.bedrooms)
          .map((apt) => (
            <div key={apt.id} className="apt-card">
              <img src={apt.image} alt="Apartment" />
              <div className="apt-details">
                <p>{apt.location}</p>
                <p>{apt.price} / month</p>
                <p>{apt.bedrooms} Bedrooms</p>
              </div>
              <button>Save</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListApt;
