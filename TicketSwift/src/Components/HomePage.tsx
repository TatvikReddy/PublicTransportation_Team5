import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import TicketSwiftLogo from "../TicketSwiftLogo.png";
import Profile from "../profile.jpg";

import bootstrap from 'bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function HomePage() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMapButtonClick = () => {
    navigate("/map");
  };

  return (
    <div className="App">
      <div
        className={`menu-icon ${isMenuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      {isMenuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="menu">
            <div className="dropdown">
            
              <div className="dropdown-content">
                <Link to="/profile">My Account</Link>
                <Link to="/find-routes">Find Routes</Link>
                <Link to="/register-ticket">Register for Tickets</Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}
      <div className="circle-container">
        {/* <Link to="/profile" className="circle"></Link> */}
        <span className="circle-text">Profile</span>
      </div>
      <header className="App-header">
        <img src={TicketSwiftLogo} className="App-logo" alt="logo" />
        <p>
          Welcome to TicketSwift, please sign in or create an account to buy
          transportation tickets.
        </p>
        <Link to="/login" className="button">
          <button className="button">Sign Up / Login</button>
        </Link>

        <Link to="/profile">
          <div className="circle-container">
            <img src={Profile} alt="Profile" />
          </div>
        </Link>

        <button
          className="button-map"
          onClick={handleMapButtonClick}
          style={{
            width: "135px",
            height: "38px",
            marginTop: "20px",
            borderRadius: "5px",
          }}
        >
          View Map
        </button>
      </header>
    </div>
  );
}

export default HomePage;
