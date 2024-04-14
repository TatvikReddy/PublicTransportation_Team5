import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../App.css';
import TicketSwiftLogo from '../TicketSwiftLogo.png';
import axios from 'axios';


function ViewProfilePage() {
    const [userInfo, setUserInfo] = useState({
      name: '',
      email: '',
      paymentInfo: '',
      travelHistory: ''
    });
  
    useEffect(() => {
      // Placeholder for fetching data from database
      // replace this with your actual data fetching logic
      async function fetchUserData() {
        try {
          // this apparently imulate an API call
          const token = localStorage.getItem("token")
          const response = await axios.post('http://localhost:3001/api/userinfo', {
            token
          });
          console.log(response);
          setUserInfo(response.data);  // Get from API to set user email to local variable
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      
      fetchUserData();
    }, []); // Empty dependency array means this effect runs once on mount
  
    // Event handler for the Report Issue button
    const handleReportIssue = () => {
      // Replace this with the actual logic, such as showing a form or modal
      console.log('Report issue clicked');
    };
  
    return (
      <div className="view-profile-page">
        <h1>View Profile</h1>
        <button className="button name-button">Name: {userInfo.name}</button>
        <button className="button email-button">Email: {userInfo.email}</button>
        
        <Link to="/report-issue" className="button">
          <button className="button report-issue-button">Report Issue</button>
        </Link>
        <Link to="/favorited-routes" className="button">
          <button className="button favorited-routes-button">Favorited Routes</button>
        </Link>
  
        <Link to="/travel-history" className="button">
          <button className="button travel-history-button">Travel History</button>
        </Link>
  
        <Link to="/ticket" className="button">
          <button className="button ticket-button">View Tickets</button>
        </Link>
        <Link to="/">
          <div className="logo-circle">
          <img src={TicketSwiftLogo} alt="logo" />
          </div>
           </Link>


            
      </div>
      
      //
    );
}

export default ViewProfilePage;