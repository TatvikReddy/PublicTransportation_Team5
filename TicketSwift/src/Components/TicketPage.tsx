import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../App.css';

function TicketPage() {
    // This page will show the ticket information with a QR code, similar to the one shown in the image
    return (
      <div className="ticket-page">
        <div className="ticket-header">
          <div className="ticket-company-logo"> {/* Logo goes here, possibly as an <img> */}</div>
          <div className="ticket-time">Month/Day/Year</div>
        </div>
        <div className="ticket-info">
          <div className="ticket-route">
            <span className="ticket-from">From (Dallas)</span>
            <span className="ticket-to">To (Houston)</span>
          </div>
          <div className="ticket-passenger">
            <span>Passenger</span>
            <span>John Doe</span>
          </div>
          <div className="ticket-details">
            <div className="ticket-seat">
              <span>Seat</span>
              <span>20A</span>
            </div>
            <div className="ticket-class">
              <span>Class</span>
              <span>Eco</span>
            </div>
            <div className="ticket-company">
              <span>Company</span>
              <span>Dart</span>
            </div>
          </div>
          <div className="ticket-time">
            <div className="ticket-departs">
              <span>Departs</span>
              <span>8:30 AM</span>
            </div>
            <div className="ticket-arrives">
              <span>Arrives</span>
              <span>8:30 AM</span>
            </div>
          </div>
          <div className="ticket-status">
            <span>Status</span>
            <span>Late</span>
          </div>
          <div className="ticket-price">
            <span>Price</span>
            <span>$20</span>
          </div>
        </div>
        <div className="ticket-qr-code">
          {/* QR Code should be generated and inserted here */}
        </div>
        <h1>Ticket</h1> 
        <Link to="/" className="button">
          <button className="button home-button">Home</button>
        </Link>
        <Link to="/profile" className="button">
          <button className="button profile-button">Back to Profile</button>
        </Link>
      </div>
    );
}

export default TicketPage;