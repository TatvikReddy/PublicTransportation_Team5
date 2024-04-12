import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import MapPage from './Components/MapPage';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import CreateAccountPage from './Components/CreateAccountPage';
import ResetPasswordPage from './Components/ResetPasswordPage';
import ViewProfilePage from './Components/ViewProfilePage';
import TicketPage from './Components/TicketPage';
import ReportIssuePage from './Components/ReportIssuePage';
import FavoritedRoutesPage from './Components/FavoritedRoutesPage';
import TravelHistoryPage from './Components/TravelHistoryPage';
import RegisterTicketPage from './Components/RegisterTicketPage';
import PurchaseTicketPage from './Components/PurchaseTicketPage';
import CheckoutTicketPage from './Components/CheckoutTicketPage';
import QrReaderPage from './Components/QrReaderPage';
import QrMakerPage from './Components/QrMakerPage';



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ViewProfilePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/ticket" element={<TicketPage />} /> 
        <Route path="/report-issue" element={<ReportIssuePage />} /> 
        <Route path="/favorited-routes" element={<FavoritedRoutesPage />} /> 
        <Route path="/travel-history" element={<TravelHistoryPage />} />
        <Route path="/register-ticket" element={<RegisterTicketPage />} />
        <Route path="/purchase-ticket" element={<PurchaseTicketPage />} />
        <Route path="/checkout-ticket" element={<CheckoutTicketPage />} />
        <Route path="/readqr" element={<QrReaderPage />} />
        <Route path="/makeqr" element={<QrMakerPage />} />
      </Routes>
    </Router>
  );

}

export default App;
