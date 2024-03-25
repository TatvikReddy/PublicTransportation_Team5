import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import TicketSwiftLogo from './TicketSwiftLogo.png'; // import the image

// Only import MongoClient if it's used in the application
// import { MongoClient } from 'mongodb';

function HomePage() {
  return (
    <div className="App">
      <div className="menu-icon">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="circle"></div> 
      <span className="circle-text">Login</span>
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
    <div>
      {/* Your login form goes here */}
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
