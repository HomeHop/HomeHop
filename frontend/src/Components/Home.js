import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';


const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Smart Apartment Finder</h1>
      <p>Find your ideal apartment with ease.</p>
      <div className="home-buttons">
        <Link to="/map">View Map</Link>
        <Link to="/personalized">See Personalized Recommendations</Link>
      </div>
    </div>
  );
};

export default Home;
