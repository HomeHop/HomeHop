import React from 'react';
import './ListHome.css';

const ListHome = ({ houses }) => {
  return (
    <div className="list-home">
      <h1>List of Homes</h1>
      <ul className="home-list">
        {houses.map(house => (
          <li key={house.id} className="home-item">
            <h2 className="home-name">{house.name}</h2>
            <p className="home-price">Price: <span>{house.price}</span></p>
            <p>Rooms: {house.rooms}</p>
            <p>Pets Allowed: {house.pets ? 'Yes' : 'No'}</p>
            <p>Washrooms: {house.washrooms}</p>
            <p>Rank: {house.rank}</p>
            <p>Location: {house.location.lat}, {house.location.lng}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListHome;