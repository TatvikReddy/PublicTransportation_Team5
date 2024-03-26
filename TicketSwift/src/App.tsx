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
        {/* This Link with the 'circle' class will take you to the profile page */}
        <Link to="/profile" className="circle"></Link>
        <span className="circle-text">Login</span> {/* You may want to wrap this text in the Link if it should be clickable */}
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
      <div className="login-container">
        <h2>Login or Create an Account</h2>
        <input type="email" placeholder="Enter email" />
        <input type="password" placeholder="Enter password" />
        <button className="login-button">Login</button>
        <Link to="/create-account" className="create-account-link">Create an Account</Link>
        <Link to="/reset-password" className="reset-password-link">Reset Password</Link>
        <Link to="/profile" className="circle-container">
          <div className="circle"></div>
          <span className="circle-text">Login</span>
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
      {/* Input fields... */}
      <button>Create Account</button>
      <Link to="/login" className="back-to-login-link">Back to Login</Link>
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
      <button>Confirm new password</button>
      {/* Input fields... */}
      <button>Confirm new password</button>
      <Link to="/login" className="back-to-login-link">Back to Login</Link>
    </div>
  );
}

function ViewProfilePage() {
  return (
    <div className="view-profile-page">
      <h2>View Profile</h2>
      
      {/* Profile information... */}
      <Link to="/" className="home-button">Home</Link>
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