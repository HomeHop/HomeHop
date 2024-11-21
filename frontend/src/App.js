import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';

function App() {
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = () => {
      const data = [
        { id: 1, name: "Apartment A", price: "$1200/month", location: "Downtown" },
        { id: 2, name: "Studio B", price: "$900/month", location: "Suburbs" },
        { id: 3, name: "Condo C", price: "$1500/month", location: "City Center" },
      ];
      setListings(data);
    };

    fetchData();
  }, []);

  const filteredListings = listings.filter((listing) =>
    listing.location.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Rental Listings</h1>
      <input
        type="text"
        placeholder="Filter by location"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredListings.map((listing) => (
          <li key={listing.id}>
            <strong>{listing.name}</strong>: {listing.price} - {listing.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
