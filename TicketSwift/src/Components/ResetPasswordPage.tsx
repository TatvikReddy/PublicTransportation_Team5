import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../App.css';
import TicketSwiftLogo from '../TicketSwiftLogo.png';
import Cookies from 'universal-cookie';
import axios from 'axios';

function ResetPasswordPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/resetpassword', {
        email,
        password,
        confirmPassword
      });
      // Optionally, you can redirect the user to another page upon successful registration
    } catch (error) {
      console.log(error)
    }
  };
  
  return (
    <div className="reset-password-page">
    <h1>Reset Password</h1>  
    <div className="input-container-reset">
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter email" value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required />
        <input type="password" placeholder="Enter new password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
        <input type="password" placeholder="Re-enter new password" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required />
        <button type ="submit" className="button reset-password-button">Reset Password</button>
      </form>
    </div>


      <Link to="/login" className="button">
        <button className="button back-to-login-button">Back to Login</button>
      </Link>
      <Link to="/">
          <div className="logo-circle">
          <img src={TicketSwiftLogo} alt="logo" />
          </div>
           </Link>
    </div>

  );

}

export default ResetPasswordPage;