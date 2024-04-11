import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../App.css';
import axios, { AxiosError } from "axios";


function CreateAccountPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrorMessage("");
      try {
        const response = await axios.post('http://localhost:3001/api/register', {
          firstName,
          lastName,
          email,
          username,
          password,
          confirmPassword
        });
        console.log(response.data); // Log the response from the server
        // Optionally, you can redirect the user to another page upon successful registration
      } catch (error) {
        if ((error as AxiosError).response) {
          // The request was made and the server responded with a status code
          console.error((error as AxiosError).response?.data);
          setErrorMessage(((error as AxiosError).response?.data as { error?: string })?.error || "An error occurred during registration.");
        } else if ((error as AxiosError).request) {
          // The request was made but no response was received
          console.error((error as AxiosError).request);
          setErrorMessage("No response received from the server. Please try again later.");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', (error as Error).message);
          setErrorMessage("An error occurred. Please try again later.");
        }
      }
    };
  
    return (
      <div className="register-page">
        <h1>Register</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
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

export default CreateAccountPage;
