import './App.css';
import React from 'react';
// import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './Components/Home';
import ListApt from './Components/ListApt';
import Personalized from './Components/Personal';
import Map from './Components/Map';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Smart Apartment Finder</h1>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<ListApt />} />
          <Route path="/personalized" element={<Personalized />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </Router>
   
  );
}

export default App;



  