import { Link } from 'react-router-dom';
import '../App.css';
import TicketSwiftLogo from '../TicketSwiftLogo.png';
function CheckoutTicketPage() {
  return (
    <div className="checkout-ticket-page">
      <form>
        <div className="rectangle-container">
          <h1 className="checkout-title">Checkout</h1>
          <div className="input-container">
            <h2 className="billing-info-title">Billing Information</h2>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="text" placeholder="Address or Apartment" />
            <input type="text" placeholder="City" />
            <input type="text" placeholder="Country" />
            <input type="text" placeholder="State" />
            <input type="text" placeholder="Postal Code" />
            <input type="text" placeholder="Phone Number" />
            <input type="text" placeholder="Email" />
            
            <h2 className="payment-title">Payment</h2>
            <input type="text" placeholder="Payment Method" />
            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="Name on Card" />
            <input type="text" placeholder="Expiration Date: Month/Year" />
            <input type="text" placeholder="Security Code" />
            
            <h2 className="payment-title">Your Order</h2>
            <button type="submit" className="purchase-button">Submit</button>
          </div>

          <Link to="/">
            <div className="logo-circle">
              <img src={TicketSwiftLogo} alt="logo" />
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CheckoutTicketPage;
