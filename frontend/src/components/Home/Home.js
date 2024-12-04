import React from 'react';
import './Home.css';

const Home = ({ navigate }) => {
  return (
    <div className="home-section">
      <div className="chrome-card">
        <div className="content-wrapper">
          {/* Extension Header */}
          <div className="extension-header fade-in">
            <div className="logo-container">
              <img src="../images/icon.png" alt="HomeHop Extension" className="extension-logo" />
              <div className="chrome-badge">Chrome Extension</div>
            </div>
            <h1>HomeHop</h1>
            <div className="divider"></div>
          </div>

          {/* Main Content */}
          <div className="content slide-up">
            <p className="feature-text">
              <span className="highlight">Supercharge</span> your home search on Google Maps
            </p>
            <ul className="feature-list">
              <li>✨ Instant rental listings overlay</li>
              <li>🏠 Smart property recommendations</li>
              <li>📍 Real-time location insights</li>
            </ul>

            {/* Call-to-Action Button */}
            <button 
              className="cta-button"
              onClick={() => navigate('personalize')}
              aria-label="Get Started with HomeHop"
            >
              <span className="button-content">
                Get Started
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;