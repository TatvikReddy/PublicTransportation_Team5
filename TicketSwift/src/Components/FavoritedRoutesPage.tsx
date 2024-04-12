import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../App.css';
import TicketSwiftLogo from '../TicketSwiftLogo.png';


interface Route {
    id: number; // Use the appropriate type for the ID
    from: string;
    to: string;
    // ... any other properties of a route
}

function FavoritedRoutesPage() {
    // Replace the following line with actual data fetching logic and type the state
    const [favoritedRoutes, setFavoritedRoutes] = useState<Route[]>([]);
  
    // Replace with your API call or context fetching logic
    useEffect(() => {
      // Dummy async function to simulate fetching data
      async function fetchFavoritedRoutes() {
        // Your fetch logic here...
        // For now, we'll set some dummy data
        setFavoritedRoutes([
          { id: 1, from: 'City A', to: 'City B' },
          { id: 2, from: 'City C', to: 'City D' },
          // ... more routes
        ]);
      }
  
      fetchFavoritedRoutes();
    }, []);
  
    return (
      <div className="App-header">
        <div className="logo-circle">
          {/* Insert logo here */}
        </div>
        <h1>Favorites</h1>
        <div>
          {favoritedRoutes.map((route) => (
            <div key={route.id} className="info-item">
              {/* If you have a route image, place <img> tag here */}
              <div className="route-placeholder"></div>
              <p>{`${route.from} to ${route.to}`}</p>
            </div>
          ))}
        </div>
        <Link to="/">
          <div className="logo-circle">
          <img src={TicketSwiftLogo} alt="logo" />
          </div>
           </Link>
           <Link to="/profile" className="button">
          <button className="button profile-button">Back to Profile</button>
        </Link>
      </div>
    );
}

export default FavoritedRoutesPage;