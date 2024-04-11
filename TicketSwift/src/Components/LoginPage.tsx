import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../App.css';
import TicketSwiftLogo from '../TicketSwiftLogo.png';
import axios, { AxiosError } from "axios";
import Cookies from 'universal-cookie';


function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(email)
      console.log(password)
      try {
        const response = await axios.post('http://localhost:3001/api/login', {
          email,
          password,
        });
        const cookies = new Cookies();
        cookies.set("token", response.data)
        console.log(response.data); // Log the response from the server
        // Optionally, you can redirect the user to another page upon successful registration
      } catch (error) {
        console.log(error)
      }
    };
  
    return (
      <div className="login-page">
        <div className="logo-circle">
          <img src={TicketSwiftLogo} alt="logo" />
        </div>
        <div className="login-container">
          <h2>Login or Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <button type="submit" className="button create-account-button">
              Login
            </button>
          </form>
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

export default LoginPage;