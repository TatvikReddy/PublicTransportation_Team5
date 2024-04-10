import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './App.css';
import TicketSwiftLogo from './TicketSwiftLogo.png';
import axios, { AxiosError } from "axios";
import { Html5QrcodeScanner } from 'html5-qrcode';
// import { Cookies } from 'js-cookie';
import MapPage from './MapPage';

const handleMapButtonClick = () => {
  // Logic to navigate to the map page
  // If using React Router v6, you might want to use the `useNavigate` hook to navigate programmatically.
};

function HomePage() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMapButtonClick = () => {
    navigate('/map');
  }

  return (
    <div className="App">
      <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!isMenuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="circle-container">
        <Link to="/profile" className="circle"></Link>
        <span className="circle-text">Profile</span>
      </div>
      <header className="App-header">
        <img src={TicketSwiftLogo} className="App-logo" alt="logo" />
        <p>
          Welcome to TicketSwift, please sign in or create an account to buy transportation tickets.
        </p>
        <Link to="/login" className="button">
          <button className="button">Sign Up / Login</button>
        </Link>
        <button className="button" onClick={handleMapButtonClick}>View Map</button>
      </header>
    </div>
  );
}

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email)
    console.log(password)
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password,
      });
      console.log(response.data); // Log the response from the server
      // Optionally, you can redirect the user to another page upon successful registration
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="login-page">
      <div className="logo-circle">
        <img src={TicketSwiftLogo} alt="logo" />
      </div>
      <div className="login-container">
        <h2>Login or Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="button create-account-button">
            Login
          </button>
        </form>
        <Link to="/create-account" className="button">
          <button className="create-account-button">Create an Account</button>
        </Link>
        <Link to="/reset-password" className="button">
          <button className="reset-password-button">Reset Password</button>
        </Link>
      </div>
    </div>
  );
}

function CreateAccountPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post('http://localhost:3001/api/register', {
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword
      });
      console.log(response.data); // Log the response from the server
      // Optionally, you can redirect the user to another page upon successful registration
    } catch (error) {
      if ((error as AxiosError).response) {
        // The request was made and the server responded with a status code
        console.error((error as AxiosError).response?.data);
        setErrorMessage(((error as AxiosError).response?.data as { error?: string })?.error || "An error occurred during registration.");
      } else if ((error as AxiosError).request) {
        // The request was made but no response was received
        console.error((error as AxiosError).request);
        setErrorMessage("No response received from the server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', (error as Error).message);
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="register-page">
      <h1>Register</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="button create-account-button">
            Create Account
          </button>
            <Link to="/login" className="button">
            <button className="button back-to-login-button">Back to Login</button>
            </Link>
        </form>
      </div>
    </div>
  );
}

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
    </div>
  );
}

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
        const response = await fetch('/api/userinfo'); //  API endpoint?
        const data = await response.json();
        setUserInfo(data);
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
      <h2>View Profile</h2>
      <Link to="/" className="button">
        <button className="button home-button">Home</button>
      </Link>
      <Link to="/report-issue" className="button">
        <button className="button report-issue-button">Report Issue</button>
      </Link>
      <Link to="/favorited-routes" className="button">
        <button className="button favorited-routes-button">Favorited Routes</button>
      </Link>

      <Link to="/travel-history" className="button">
        <button className="button travel-history-button">Travel History</button>
      </Link>
      <h3>User Name: {userInfo.name}</h3>
  <p>Email: {userInfo.email}</p>
  <p>Payment Info: {userInfo.paymentInfo}</p>
  <p>Travel History: {userInfo.travelHistory}</p>
    </div>
    //
  );
}

function TicketPage() {
  // This page will show the ticket information with a QR code, similar to the one shown in the image
  return (
    <div className="ticket-page">
      {/* Insert the layout and elements to replicate the ticket display */}
    </div>
  );
}

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

function FavoritedRoutesPage() {
  // This page will display the user's favorited routes
  return (
    <div className="favorited-routes-page">
      <h1>Favorited Routes</h1>
      <Link to="/" className="button">
        <button className="button home-button">Home</button>
      </Link>
      <Link to="/profile" className="button">
        <button className="button profile-button">Back to Profile</button>
      </Link>
    </div>
  );
}

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

// function EnterLocationPage() {
//   // This page will contain a form for reporting issues
//   return (
//     <div className="enter-location-page">
//       {/* Insert the layout and elements to replicate the issue reporting form */}
//     </div>
//   );
// }

function ViewRoutesPage() {
  // This page will display the user's favorited routes
  return (
    <div className="view-routes-page">
      {/* Insert the layout and elements to replicate the favorites display */}
    </div>
  );
}

function RegisterTicketPage() {
  // This page will show the ticket information with a QR code, similar to the one shown in the image
  return (
    <div className="registor-ticket-page">
      {/* Insert the layout and elements to replicate the ticket display */}
    </div>
  );
}

function PurchaseTicketPage() {
  // This page will contain a form for reporting issues
  return (
    <div className="purchase-ticket-page">
      {/* Insert the layout and elements to replicate the issue reporting form */}
    </div>
  );
}

function CheckoutTicketPage() {
  // This page will display the user's favorited routes
  return (
    <div className="checkout-ticket-page">
      {/* Insert the layout and elements to replicate the favorites display */}
    </div>
  );
}

function ViewGoogleMapPage() {
  return (
    <div className="map-page">
      <MapPage />
    </div>
  );
}

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ViewProfilePage />} />
        <Route path="/map" element={<ViewGoogleMapPage />} />
        <Route path="/ticket" element={<TicketPage />} /> 
        <Route path="/report-issue" element={<ReportIssuePage />} /> 
        <Route path="/favorites" element={<FavoritedRoutesPage />} /> 
        <Route path="/travel-history" element={<TravelHistoryPage />} />
        {/* <Route path="/enter-location" element={<EnterLocationPage />} /> */}
        <Route path="/view-routes" element={<ViewRoutesPage />} />
        <Route path="/register-ticket" element={<RegisterTicketPage />} />
        <Route path="/purchase-ticket" element={<PurchaseTicketPage />} />
        <Route path="/checkout-ticket" element={<CheckoutTicketPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
