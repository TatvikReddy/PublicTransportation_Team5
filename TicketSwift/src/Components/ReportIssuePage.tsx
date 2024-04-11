import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../App.css';


function ReportIssuePage() {
    // This page will contain a form for reporting issues
    return (
  <div className="report-issue-page">
        <h1>Report Issue</h1>
        <Link to="/" className="button">
          <button className="button home-button">Back to Home</button>
        </Link>
        <Link to="/profile" className="button">
          <button className="button profile-button">Back to Profile</button>
        </Link>
        <input placeholder="Name" />
        <input placeholder="Email" />
        <input placeholder="Subject" />
        <input placeholder="Issue" />
        <button type="submit">Submit</button>
      </div>
    );
}

export default ReportIssuePage;