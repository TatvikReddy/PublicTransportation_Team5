import { Link } from 'react-router-dom';
import '../App.css';
import TicketSwiftLogo from '../TicketSwiftLogo.png';

function TicketPage() {
  // This page will show the ticket information with a QR code, similar to the one shown in the image
  return (
    <div className="ticket-info" style={{ marginTop: '100px' }}>
      <div className="ticket-route" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '65px' }}>
          <span className="ticket-passenger" style={{ fontSize: '14px' }}>Passenger</span>
          <span className="ticket-passenger-name" style={{ fontSize: '18px' }}>John Doe</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '50px' }}>
          <span className="ticket-from" style={{ fontSize: '14px' }}>From</span>
          <span className="ticket-from-location" style={{ fontSize: '18px' }}>Dallas</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '30px' }}>
          <span className="ticket-to" style={{ fontSize: '14px' }}>To</span>
          <span className="ticket-to-location" style={{ fontSize: '18px' }}>Houston</span>
        </div>
      </div>
      <div className="ticket-details" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '60px' }}>
          <span className="ticket-seat" style={{ fontSize: '14px' }}>Seat</span>
          <span className="ticket-seat-num" style={{ fontSize: '18px' }}>12A</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 35px' }}>
          <span className="ticket-class" style={{ fontSize: '14px' }}>Class</span>
          <span className="ticket-class-status" style={{ fontSize: '18px' }}>Economy</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '45px' }}>
          <span className="ticket-company" style={{ fontSize: '14px' }}>Company</span>
          <span className="ticket-company-name" style={{ fontSize: '18px' }}>XYZ</span>
        </div>
      </div>
      <div className="ticket-details" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '30px' }}>
          <span className="ticket-depart" style={{ fontSize: '14px' }}>Depart</span>
          <span className="ticket-depart-time" style={{ fontSize: '18px' }}>10:00 AM</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 45px' }}>
          <span className="ticket-arrive" style={{ fontSize: '14px' }}>Arrive</span>
          <span className="ticket-arrive-time" style={{ fontSize: '18px' }}> 2:00 PM</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '40px' }}>
          <span className="ticket-status" style={{ fontSize: '14px' }}>Status</span>
          <span className="ticket-status-time" style={{ fontSize: '18px' }}>On Time</span>
        </div>
      </div>
      <div className="ticket-price" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ fontSize: '14px' }}>Price</span>
        <span style={{ fontSize: '18px' }}>$200</span>
      </div>
      <div className="ticket-qr-code" style={{ textAlign: 'center' }}>
        {/* QR Code should be generated and inserted here */}
      </div>
      <div style={{ marginTop: '20px' }}>
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