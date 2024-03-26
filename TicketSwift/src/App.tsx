import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import TicketSwiftLogo from './TicketSwiftLogo.png';

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
        {/* This Link with the 'circle' class will take you to the profile page */}
        <Link to="/profile" className="circle"></Link>
        <span className="circle-text">Profile</span>
      </div>
      <header className="App-header">
        <img src={TicketSwiftLogo} className="App-logo" alt="logo" />
        <p>
          Welcome to TicketSwift, please sign in or create an account to buy transportation tickets.
        </p>
        <Link to="/login" className="button App-link">
          <button className="button">Sign Up / Login</button>
        </Link>
      </header>
    </div>
  );
}

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login or Create an Account</h2>
        <input type="email" placeholder="Enter email" />
        <input type="password" placeholder="Enter password" />
        <button className="button login-button">Login</button>
        <Link to="/create-account" className="button">
          <button className="button create-account-button">Create an Account</button>
        </Link>
        <Link to="/reset-password" className="button">
          <button className="button reset-password-button">Reset Password</button>
        </Link>
      </div>
    </div>
  );
}

function CreateAccountPage() {
  return (
    <div className="create-account-page">
      <h2>Create Account</h2>
      <input type="text" placeholder="Enter first name" />
      <input type="text" placeholder="Enter last name" />
      <input type="email" placeholder="Enter email" />
      <input type="text" placeholder="Enter username" />
      <input type="password" placeholder="Enter password" />
      <input type="password" placeholder="Re-enter password" />
      <button className="button create-account-button">Create Account</button>
      <Link to="/login" className="button">
        <button className="button back-to-login-button">Back to Login</button>
      </Link>
    </div>
  );
}

function ResetPasswordPage() {
  return (
    <div className="reset-password-page">
      <h2>Reset Password</h2>
      <input type="email" placeholder="Enter email" />
      <input type="password" placeholder="Enter new password" />
      <input type="password" placeholder="Re-enter new password" />
      <button className="button reset-password-button">Reset Password</button>
      <Link to="/login" className="button">
        <button className="button back-to-login-button">Back to Login</button>
      </Link>
    </div>
  );
}

function ViewProfilePage() {
  return (
    <div className="view-profile-page">
      <h2>View Profile</h2>
      <Link to="/" className="button">
        <button className="button home-button">Home</button>
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ViewProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
