import React, { useState, useEffect } from 'react';
import './styles/Personal.css';

const Personalized = () => {
  const [personalizedApts, setPersonalizedApts] = useState([]);

  useEffect(() => {
    // Simulate fetching personalized recommendations (dummy data for now)
    const recommendations = [
      { id: 1, location: 'Old Strathcona', price: 1000, image: 'https://via.placeholder.com/150' },
      { id: 2, location: 'Garneau', price: 1300, image: 'https://via.placeholder.com/150' },
    ];
    setPersonalizedApts(recommendations);
  }, []);

  return (
    <div className="personalized-container">
      <h2>Personalized Recommendations</h2>
      <div className="apartment-list">
        {personalizedApts.map((apt) => (
          <div key={apt.id} className="apt-card">
            <img src={apt.image} alt="Apartment" />
            <div className="apt-details">
              <p>{apt.location}</p>
              <p>{apt.price} / month</p>
            </div>
            <button>Save</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Personalized;
