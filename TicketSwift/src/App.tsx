import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import TicketSwiftLogo from './TicketSwiftLogo.png'; // Make sure the image path is correct

function HomePage() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div className="App">
      <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!isMenuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="circle-container">
        <div className="circle"></div>
        <span className="circle-text">Login</span>
      </div>
      <header className="App-header">
        <img src={TicketSwiftLogo} className="App-logo" alt="logo" />
        <p>
          Welcome to TicketSwift, please sign in or create an account to buy transportation tickets.
        </p>
        <Link to="/login" className="App-link">
          Sign Up / Login
        </Link>
      </header>
    </div>
  );
}

function LoginPage() {
  return (
    <div className="login-page">
      <div className="logo-circle">
        <img src={TicketSwiftLogo} alt="logo" />
        </div>
        <div className="login-container" >
        <h2>Login or Create an Account </h2>

        <input type="email" placeholder="Enter Email"  style={{ width: '300px', height: '35px',marginBottom: '20px' }} />
        <input type="password" placeholder="Enter Password" style={{ width: '300px', height: '35px' }}/>
        <button className="login-button">Login</button>
        <button className="create-account-button">Create an Account</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
