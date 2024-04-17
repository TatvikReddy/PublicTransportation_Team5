import { Link } from 'react-router-dom';
import '../App.css';
import TicketSwiftLogo from '../TicketSwiftLogo.png';

function RegisterTicketPage() {
    return (
        <div className="register-ticket-page">
            <form>
                <div className="rectangle-container">
                    <div className="rectangle"></div>
                    <p className="rectangle-text">To: Houston</p>
                    <p className="rectangle-text">From: Dallas</p>
                </div>
                <div className="input-container">
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                    <Link to="/purchase-ticket">
                        <button type="button" className="purchase-button">Proceed to purchase ticket</button>
                    </Link>
                </div>
                <Link to="/">
                    <div className="logo-circle">
                        <img src={TicketSwiftLogo} alt="logo" />
                    </div>
                </Link>
            </form>
        </div>
    );
}

export default RegisterTicketPage;