import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';
import TicketSwiftLogo from '../TicketSwiftLogo.png';
import Profile from '../profile.jpg';
import TicketSwiftLogoHome from '../1TicketSwiftLogo.jpg';

function HomePage() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
  
    const handleMapButtonClick = () => {
      navigate('/map');
    }
  
    return  (
        <div className="App">
            <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!isMenuOpen)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            {isMenuOpen && (
                <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
                    <div className="menu">
                    <div className="dropdown">
                            <button className="dropbtn">
                                <i className="fa fa-caret-down"></i>
                            </button>
                            <div className="dropdown-content">
                              <Link to="/profile">My Account</Link>
                              <Link to="/find-routes">Find Routes</Link>
                              <Link to="/register-ticket">Register for Tickets</Link>
                          </div>
                        </div>  
                    </div>
                </div>
            )}
        <div className="circle-container">
          <Link to="/profile" className="circle">
          </Link>
          <span className="circle-text">Profile</span>
        </div>
        <header className="App-header">
          <img src={TicketSwiftLogoHome} className="App-logo" alt="logo" />
          <p>
            Welcome to TicketSwift, please sign in or create an account to buy transportation tickets.
          </p>
          <Link to="/login" className="button">
            <button className="button">Sign Up / Login</button>
          </Link>

          <Link to="/profile">
          <div className="circle-container">
          <img src={Profile} alt="Profile" />
          </div>
           </Link>

           
          <button className="button-map" onClick={handleMapButtonClick} style ={{width: '135px', height: '38px', marginTop: '20px', borderRadius: '5px' }}>View Map</button>
        </header>
      </div>
    );
  }

  export default HomePage;

