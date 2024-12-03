import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Personalized from './components/Personalized/Personalized';
import {runPrompt} from './api/googleGemini';
import ListHome from './components/ListHome/ListHome'; // Import ListHome component


function App() {
  const [page, setPage] = useState('home'); // Tracks the current page
  const [houses, setHouses] = useState([]); // Stores filtered house data
  const [prompt, setPrompt] = useState(''); // State to hold user input
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // function to handle the prompt, params and response
  const handlePrompt = async () => {
    try {
      const params = {
        systemPrompt: 'You are a helpful and friendly assistant.',
        
      }
      setLoading(true);
      const response = await runPrompt(prompt, params);
      setResponse(response);
      setLoading(false);

    }
    catch (e) {
      console.error('Error running prompt:', e);
      setError('Error running prompt');
      setLoading(false);
    }

  };

  // Function to handle form submission from the Personalize page
  const submitPreferences = (preferences) => {
    // Simulate fetching houses based on user preferences
    const fetchedHouses = [
      {
        id: 1,
        name: 'Apartment A',
        price: 1200,
        rooms: 2,
        pets: true,
        washrooms: 1,
        rank: 'Great Match',
        location: 'Downtown',
        propertyType: 'Apartment',
        parking: true,
      },
      {
        id: 2,
        name: 'Studio B',
        price: 900,
        rooms: 1,
        pets: false,
        washrooms: 1,
        rank: 'Good Match',
        location: 'Suburb',
        propertyType: 'Studio',
        parking: false,
      },
      {
        id: 3,
        name: 'House C',
        price: 1500,
        rooms: 3,
        pets: true,
        washrooms: 2,
        rank: 'Great Match',
        location: 'Downtown',
        propertyType: 'House',
        parking: true,
      },
      {
        id: 4,
        name: 'Apartment D',
        price: 1100,
        rooms: 2,
        pets: false,
        washrooms: 1,
        rank: 'Good Match',
        location: 'Suburb',
        propertyType: 'Apartment',
        parking: false,
      },
      // Add more houses as needed
      {
        id: 5,
        name: 'Apartment E',
        price: 1300,
        rooms: 2,
        pets: true,
        washrooms: 1,
        rank: 'Great Match',
        location: 'Downtown',
        propertyType: 'Apartment',
        parking: true,
      },
      {
        id: 6,
        name: 'Studio F',
        price: 950,
        rooms: 1,
        pets: false,
        washrooms: 1,
        rank: 'Good Match',
        location: 'Suburb',
        propertyType: 'Studio',
        parking: false,
      },
      {
        id: 7,
        name: 'House G',
        price: 1600,
        rooms: 3,
        pets: true,
        washrooms: 2,
        rank: 'Great Match',
        location: 'Downtown',
        propertyType: 'House',
        parking: true,
      },
      {
        id: 8,
        name: 'Apartment H',
        price: 1200,
        rooms: 2,
        pets: false,
        washrooms: 1,
        rank: 'Good Match',
        location: 'Suburb',
        propertyType: 'Apartment',
        parking: false,
      },
      {
        id: 9,
        name: 'Apartment I',
        price: 1400,
        rooms: 2,
        pets: true,
        washrooms: 1,
        rank: 'Great Match',
        location: 'Downtown',
        propertyType: 'Apartment',
        parking: true,
      },
      {
        id: 10,
        name: 'Studio J',
        price: 1000,
        rooms: 1,
        pets: false,
        washrooms: 1,
        rank: 'Good Match',
        location: 'Suburb',
        propertyType: 'Studio',
        parking: false,
      },
      {
        id: 11,
        name: 'House K',
        price: 1700,
        rooms: 3,
        pets: true,
        washrooms: 2,
        rank: 'Great Match',
        location: 'Downtown',
        propertyType: 'House',
        parking: true,
      },
      {
        id: 12,
        name: 'Apartment L',
        price: 1300,
        rooms: 2,
        pets: false,
        washrooms: 1,
        rank: 'Good Match',
        location: 'Suburb',
        propertyType: 'Apartment',
        parking: false,
      },
    ];

    
    // Filter houses based on preferences
    const filteredHouses = fetchedHouses.filter(house => {
      return (
        house.rooms >= preferences.rooms &&
        house.pets === preferences.pets &&
        house.price <= preferences.budget &&
        house.washrooms >= preferences.washrooms &&
        house.propertyType === preferences.propertyType &&
        house.location === preferences.preferredLocations &&
        house.parking === preferences.parking
      );
    });


    console.log('filteredHouses:', filteredHouses);



    setHouses(filteredHouses); // Update houses state with filtered houses
    setPage('listHome'); // Navigate to the listHome page
  };

  const navigate = (target) => {
    setPage(target);
  };

  return (
    <div className="app">
      <NavBar navigate={navigate} />
      {page === 'home' && <Home navigate={navigate} />}
      {page === 'personalize' && <Personalized submitPreferences={submitPreferences} />}
      {page === 'listHome' && <ListHome houses={houses} />}
      {/* <textarea
        placeholder="Enter your prompt here"
        value={prompt} // Controlled component
        onChange={(e) => setPrompt(e.target.value)} // Update prompt state
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={handlePrompt} disabled={!prompt || loading}>
        {loading ? 'Generating...' : 'Run Prompt'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )} */}
    </div>
  );
}


  
export default App;
