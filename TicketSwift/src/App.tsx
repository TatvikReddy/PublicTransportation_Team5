import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MapPage from "./Components/MapPage";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import CreateAccountPage from "./Components/CreateAccountPage";
import ResetPasswordPage from "./Components/ResetPasswordPage";
import ViewProfilePage from "./Components/ViewProfilePage";
import TicketPage from "./Components/TicketPage";
import ReportIssuePage from "./Components/ReportIssuePage";

import QrReaderPage from "./Components/QrReaderPage";
import QrMakerPage from "./Components/QrMakerPage";
import PaymentPage from "./Components/Payment";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// function Navigation() {
//   const navigate = useNavigate();
//   const cookies = new Cookies();

//   useEffect(() => {
//     const token = cookies.get('token');

//     if (token) {
//       // If the token is present, navigate to the map page
//       navigate('/map');
//     } else {
//       // If there's no token, navigate to the login page
//       navigate('/login');
//     }
//   }, []);

//   return null;
// }

function App() {
  return (
    <Router>
      {/* <Navigation /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ViewProfilePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/ticket" element={<TicketPage />} />
        <Route path="/report-issue" element={<ReportIssuePage />} />        
        <Route path="/readqr" element={<QrReaderPage />} />
        <Route path="/makeqr" element={<QrMakerPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
