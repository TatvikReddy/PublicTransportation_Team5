import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import TicketSwiftLogo from './TicketSwiftLogo.png';
import axios from "axios";

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
      <div className="login-container">
        <h2>Login or Create an Account</h2>
        <input type="email" placeholder="Enter Email" style={{ width: '300px', height: '35px', marginBottom: '20px' }} />
        <input type="password" placeholder="Enter Password" style={{ width: '300px', height: '35px' }} />
        <button className="login-button">Login</button>
        <Link to="/create-account" className="button">
          <button className="create-account-button">Create an Account</button>
        </Link>
        <Link to="/reset-password" className="button">
          <button className="reset-password-button">Reset Password</button>
        </Link>
      </div>
    </div>
  );
}

function CreateAccountPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
   
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setConfirmPassword("true");
      try {
        const { data } = await axios.post(`/api/register`, {
          firstName,
          lastName,
          email,
          password,
          confirmPassword
        });
        setConfirmPassword("false");
        console.log(data); // Log the response from the server
      } catch (err) {
        setConfirmPassword("false");
        console.error(err); // Log any errors that occur
      }
    };
    return (
      <div className="register-page">
        <h1>Register</h1>
        <div className="register-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="button create-account-button">
              Create Account
            </button>
            <Link to="/login" className="button">
            <button className="button back-to-login-button">Back to Login</button>
            </Link>
          </form>
        </div>
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
