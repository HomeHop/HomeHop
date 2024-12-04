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
  const submitPreferences = (preferences, HouseData) => {
    console.log('Preferences:', preferences);
    console.log('House Data:', HouseData);

    //print the first element of houseData
    // console.log('House Data:', HouseDa



    //HouseData is of the form 

    // Filter houses based on preferences
    const filteredHouses = HouseData.filter((house) => {
      // Check if the house meets the user's preferences
      

      return (
        
        house.price <= preferences.price //&&
        
        // house.bedrooms >= preferences.bedrooms &&
        // house.baths >= preferences.baths &&
        // (preferences.cats ? house.cats_allowed : true) &&
        // (preferences.dogs ? house.dogs_allowed : true) //&&
        // (preferences.utilities_included ? house.utilities_included : true) //&&
        // (preferences.type === 'Any' ? true : house.type === preferences.type) &&
        // (preferences.features.length === 0
        //   ? true
        //   // check if all selected features are included in the house features
        //   : preferences.features.every((feature) => house.features.includes(feature)))
      );
    });

    //eg data
    // "address": "524 10th Ave",
    // "availability": "Immediate",
    // "baths": 2,
    // "bedrooms": 1,
    // "cats": true,
    // "city": "Calgary",
    // "dogs": true,
    // "features": "['Elevator', 'Storage Lockers', 'Zero-Step Entrance', 'Fridge']",
    // "location": "Beltline",
    // "price": 1881,
    // "province": "Alberta",
    // "title": "The Oliver East - New Luxury Beltline Lifestyle - $500 Security Deposit",
    // "type": "Apartment",
    // "utilities_included": false

    // Update the houses state with the filtered houses
    setHouses(filteredHouses);
    console.log('Filtered Houses:', filteredHouses);
    // Navigate to the listHome page
    setPage('listHome');
    
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
