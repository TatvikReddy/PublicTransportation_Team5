import { Link } from 'react-router-dom';
import '../App.css';
import TicketSwiftLogo from '../TicketSwiftLogo.png';


function PurchaseTicketPage() {
    // This page will contain a form for reporting issues
    return (
      <div className="register-ticket-page">
      <form>
      <div className="rectangle-container">

<div className="rectangle"></div>
<p className="rectangle-text">Ticket</p>
<p className="rectangle-text">Each: $0.00</p>
<p className="rectangle-text">Qty: 1</p>
<p className="rectangle-text">Total: $0.00</p>
</div>
      <div className="input-container">
      <p className="rectangle-text total-text">Tax: $0.00</p>
      <p className="rectangle-text total-text">Total: $0.00</p>
                <Link to="/checkout-ticket">
                <button type="button" className="purchase-button">Proceed to Checkout</button>
                </Link>
</          div>

          <Link to="/">
    <div className="logo-circle">
      <img src={TicketSwiftLogo} alt="logo" />
    </div>
        </Link>
      </form>
  </div>
    );
}

export default PurchaseTicketPage;