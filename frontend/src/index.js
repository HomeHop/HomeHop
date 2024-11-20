import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./App.css";

// Create a new div element with the class "container"
const root = document.createElement("div");
root.className = "container";
document.body.appendChild(root);

// Render the React app into the newly created div
const rootDiv = ReactDOM.createRoot(root);
rootDiv.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
