import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Personalized from './components/Personalized/Personalized';
import {runPrompt} from './api/googleGemini';


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
      <textarea
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
      )}
    </div>
  );
}


  
export default App;
