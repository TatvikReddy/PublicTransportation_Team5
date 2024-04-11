import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../App.css';
import TicketSwiftLogo from '../TicketSwiftLogo.png';


function ReportIssuePage() {
    // This page will contain a form for reporting issues
    return (
  <div className="report-issue-page">
        <h1>Report Issue</h1>
        <Link to="/">
          <div className="logo-circle">
          <img src={TicketSwiftLogo} alt="logo" />
          </div>
           </Link>
           <textarea placeholder="Name" style={{ width: '50%', height: '40px',marginTop: '30px' }}></textarea>
        <textarea placeholder="Email" style={{ width: '50%', height: '40px',marginTop: '10px' }}></textarea>
        <textarea placeholder="Subject" style={{ width: '50%', height: '40px',marginTop: '10px' }}></textarea>
        <textarea placeholder="Issue" style={{ width: '50%', height: '150px', marginTop: '10px' }}></textarea>
        <button type="submit"style={{ width: '18%', height: '38px', marginTop: '20px', borderRadius: '5px' }}>Submit</button>
        <Link to="/profile" className="button">
          <button className="button profile-button">Back to Profile</button>
        </Link>
      </div>
    );
}

export default ReportIssuePage;