import React from 'react';
import './Home.css';

const Home = ({ navigate }) => {
  return (
    <div className="home-section">
      {/* Logo or Hero Image */}
      <div className="image-wrapper">
        <img src="logo.svg" alt="App Logo" />
      </div>

      {/* Headline and Subtext */}
      <div className="content">
        <h1>Welcome to Our App</h1>
        <p>Your smart solution for finding the perfect home.</p>

        {/* Call-to-Action Button */}
        <button className="cta-button" onClick={() => navigate('personalize')}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
