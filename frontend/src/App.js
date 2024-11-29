import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Personalized from './components/Personalized/Personalized';

function App() {
  const [page, setPage] = useState('home'); // Tracks the current page
  const [houses, setHouses] = useState([]); // Stores filtered house data

  // Function to handle form submission from the Personalize page
  const submitPreferences = (preferences) => {
    // Simulate fetching houses based on user preferences
    const fetchedHouses = [
      {
        id: 1,
        name: 'Apartment A',
        price: '$1200/month',
        rooms: 2,
        pets: true,
        washrooms: 1,
        rank: 'Great Match',
        location: { lat: 53.5461, lng: -113.4938 },
      },
      {
        id: 2,
        name: 'Studio B',
        price: '$900/month',
        rooms: 1,
        pets: false,
        washrooms: 1,
        rank: 'Good Match',
        location: { lat: 53.5444, lng: -113.4909 },
      },
    ];

    setHouses(fetchedHouses); // Update the house data
    setPage('map'); // Navigate to the map page
  };

  const navigate = (target) => {
    setPage(target);
  };

  return (
    <div className="app">
      <NavBar navigate={navigate} />
      {page === 'home' && <Home navigate={navigate} />}
      {page === 'personalize' && <Personalized submitPreferences={submitPreferences} />}
      {page === 'map' && <div>Map Page</div>}
    </div>
  );
}


  
export default App;
