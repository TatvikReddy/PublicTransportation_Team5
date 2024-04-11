import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import '../App.css';


function TravelHistoryPage() {
    // This page will show the ticket information with a QR code, similar to the one shown in the image
    return (
      <div className="travel-history-page">
  
        <h1>Travel History</h1>
        <Link to="/" className="button">
          <button className="button home-button">Home</button>
        </Link>
        <Link to="/profile" className="button">
          <button className="button profile-button">Back to Profile</button>
        </Link>
      </div>
      
    );
}

export default TravelHistoryPage;