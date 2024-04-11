import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';
import TicketSwiftLogo from '../TicketSwiftLogo.png';

function HomePage() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
  
    const handleMapButtonClick = () => {
      navigate('/map');
    }
  
    return (
      <div className="App">
        <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!isMenuOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="circle-container">
          <Link to="/profile" className="circle"></Link>
          <span className="circle-text">Profile</span>
        </div>
        <header className="App-header">
          <img src={TicketSwiftLogo} className="App-logo" alt="logo" />
          <p>
            Welcome to TicketSwift, please sign in or create an account to buy transportation tickets.
          </p>
          <Link to="/login" className="button">
            <button className="button">Sign Up / Login</button>
          </Link>

          <button className="button" onClick={handleMapButtonClick}>View Map</button>
        </header>
      </div>
    );
  }

  export default HomePage;