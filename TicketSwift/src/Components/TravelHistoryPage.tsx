import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import '../App.css';
import TicketSwiftLogo from '../TicketSwiftLogo.png';

function TravelHistoryPage() {
    // This page will show the ticket information with a QR code, similar to the one shown in the image
    return (
      <div className="travel-history-page">
        <h1>
          Travel
          <br />
          History
        </h1>
        <Link to="/">
          <div className="logo-circle">
          <img src={TicketSwiftLogo} alt="logo" />
          </div>
           </Link>
           <div className="travel-history">
            {Array(4).fill(0).map((_, i) => (
             <div key={i} className="travel-item">
              <div className="blank-box"></div>
              <p className="travel-text">To and From</p>
          </div>
        ))}
        </div>
      </div>
    );
}

export default TravelHistoryPage;