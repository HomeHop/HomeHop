// NavBar.js
import React from 'react';
import './NavBar.css';

const Navbar = ({ navigate }) => {
  return (
    <nav className="navbar">
      <ul>
        <li onClick={() => navigate('home')} className="nav-item">
          Home
        </li>
        <li onClick={() => navigate('personalize')} className="nav-item">
          Personalize
        </li>
        <li onClick={() => navigate('map')} className="nav-item">
          Map
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;