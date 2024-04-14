import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../App.css';
import TicketSwiftLogo from '../TicketSwiftLogo.png';
import { useState } from 'react';
import axios from 'axios';


function ReportIssuePage() {
    // This page will contain a form for reporting issues

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("")
  const [issue, setIssue] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const feedback = await axios.post('http://localhost:3001/api/reportissue', {
          name, 
          email,
          subject,
          issue
        });
        // Optionally, you can redirect the user to another page upon successful registration
      } catch (error) {
        console.log(error)
      }
    };

    return (
  <div className="report-issue-page">
    
        <h1>Report Issue</h1>
       
        <form onSubmit={handleSubmit}>
        <Link to="/">
          <div className="logo-circle">
          <img src={TicketSwiftLogo} alt="logo" />
          </div>
           </Link>

           
           <textarea placeholder="Name" style={{ width: '50%', height: '40px',marginTop: '30px' }} value={name}
              onChange={(e) => setName(e.target.value)} ></textarea>
        <textarea placeholder="Email" style={{ width: '50%', height: '40px',marginTop: '10px' }} value={email}
              onChange={(e) => setEmail(e.target.value)}></textarea>
        <textarea placeholder="Subject" style={{ width: '50%', height: '40px',marginTop: '10px' }} value={subject}
              onChange={(e) => setSubject(e.target.value)}></textarea>
        <textarea placeholder="Issue" style={{ width: '50%', height: '150px', marginTop: '10px' }} value={issue}
              onChange={(e) => setIssue(e.target.value)}> </textarea>
        <button type="submit"style={{ width: '18%', height: '38px', marginTop: '20px', borderRadius: '5px' }}>Submit</button>


        <Link to="/profile" className="button">
          <button className="button profile-button">Back to Profile</button>
          
        </Link>
        </form>
      </div>

    );
}

export default ReportIssuePage;