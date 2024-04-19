import { Link } from 'react-router-dom';
import '../App.css';
import TicketSwiftLogo from '../TicketSwiftLogo.png';
import React, { useState } from 'react';

function TicketPage() {
  // This page will show the ticket information with a QR code, similar to the one shown in the image
  const [passengerName, setPassengerName] = useState('');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [classStatus, setClassStatus] = useState(''); 
  const [companyName, setCompanyName] = useState('');
  const [departTime, setDepartTime] = useState('');
  const [arriveTime, setArriveTime] = useState('');
  const [status, setStatus] = useState('');
  const [price, setPrice] = useState('');

  return (
    
      
    <div style={{marginTop: '100px'}}>
      <h1>Ticket Information</h1>
      <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      <div style={{ flex: '1 0 30%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Passenger</span>
        <span >
          {passengerName || 'John Doe'}
        </span>
      </div>
      <div style={{ flex: '1 0 30%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>From</span>
        <span >
          {fromLocation || 'Dallas'}
        </span>
      </div>
      <div style={{ flex: '1 0 30%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>To</span>
        <span >
          {toLocation || 'Houston'}
        </span>
      </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ flex: '1 0 30%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Seat</span>
          <span >
            {seatNumber || 'A1'}
          </span>
        </div>
        <div style={{ flex: '1 0 30%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Class</span>
          <span >
            {classStatus || 'First Class'}
          </span>
        </div>
        <div style={{ flex: '1 0 30%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Company</span>
          <span >
            {companyName || 'TicketSwift'}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ flex: '1 0 30%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Depart</span>
          <span >
            {departTime || '12:00 PM'}
          </span>
        </div>
        <div style={{ flex: '1 0 30%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Arrive</span>
          <span >
            {arriveTime || '2:00 PM'}
          </span>
        </div>
        <div style={{ flex: '1 0 30%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Status</span>
          <span >
            {status || 'On Time'}
          </span>
        </div>
      </div>
      <div style={{ flex: '1 0 30%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Price</span>
        <span >
          {price || '$50.00'}
        </span>
      </div>
      </div>
      <div style={{ marginTop: "20px", display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <Link to="/makeqr" className="button">
          <button className="button profile-button">Make QR</button>
        </Link>
        <Link to="/profile" className="button">
          <button className="button profile-button">Back to Profile</button>
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

export default TicketPage;