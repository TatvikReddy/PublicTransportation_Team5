import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../App.css';
import TicketSwiftLogo from '../TicketSwiftLogo.png';


function ResetPasswordPage() {

  return (
    <div className="reset-password-page">
      <h2>Reset Password</h2>  
      <input type="email" placeholder="Enter email" />
      <input type="password" placeholder="Enter new password" />
      <input type="password" placeholder="Re-enter new password" />
      <button className="button reset-password-button">Reset Password</button>
      <Link to="/login" className="button">
        <button className="button back-to-login-button">Back to Login</button>
      </Link>
      <Link to="/">
          <div className="logo-circle">
          <img src={TicketSwiftLogo} alt="logo" />
          </div>
           </Link>
    </div>
  );

}

export default ResetPasswordPage;