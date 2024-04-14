import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../App.css';
import TicketSwiftLogo from '../TicketSwiftLogo.png';
import axios, { AxiosError } from "axios";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password,
      });
      const cookies = new Cookies();
      cookies.set("token", response.data)
      console.log(response)
      localStorage.setItem("token", response.data)
      // Optionally, you can redirect the user to another page upon successful registration
      navigate("/ticket")
    } catch (error) {
      console.log(errorMsg)
      setErrorMsg("Invalid email or password"); 
    }
  };

  return (
    <div className="login-page">
      <div className="logo-circle">
        <img src={TicketSwiftLogo} alt="logo" />
      </div>
      <div className="login-container">
        <h2>Login or Create an Account</h2>
        <p style={{ color: 'red' }}>{errorMsg}</p>
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ margin: '10px 0' }}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ margin: '10px 0' }}

            />
          </div>
          <button type="submit" className="button create-account-button" >
            Login
          </button>
        </form>
        <Link to="/create-account" className="button">
          <button className="create-account-button">Create an Account</button>
        </Link>
        <Link to="/reset-password" className="button">
          <button className="reset-password-button">Reset Password</button>
        </Link>
        <Link to="/">
          <div className="logo-circle">
            <img src={TicketSwiftLogo} alt="logo" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;