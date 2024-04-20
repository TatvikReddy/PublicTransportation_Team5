import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import TicketSwiftLogo from "../TicketSwiftLogo.png";
import { useLocation } from "react-router-dom";

// Renders errors or successfull transactions on the screen.
function Message({ content }: any) {
  return <p>{content}</p>;
}

function PaymentPage() {
  const params = useParams();
  var price = 0;
  let uuid = params.uuid;
  useEffect(() => {
    // Placeholder for fetching data from database
    // replace this with your actual data fetching logic
    async function fetchData() {
      try {
        // this apparently imulate an API call
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:3001/api/checkout",
          {
            uuid,
          }
        );
        console.log(response.data);
        for (let i in response.data.tickets) {
          console.log(response.data.tickets[i]);
          console.log(response.data.tickets[i].price);
          price += response.data.tickets[i].price;
          console.log(price);
        }
        console.log(price);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();
  }, []);

  const initialOptions = {
    clientId: "test",
    "enable-funding": "paylater,venmo,card",
    "disable-funding": "",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };

  const [TripName, setTripName] = useState("");
  const [message, setMessage] = useState("");
  const [prices, setPrices] = useState([0]); // Initialize with one price
  const [quantity, setQuantity] = useState(1); // Initialize with one quantity
  const [totalPrice, setTotalPrice] = useState("");
  const [tax, setTax] = useState("");
  const [subTotal, setSubTotal] = useState("");
  const [tickets, setTickets] = useState([]);

  const location = useLocation();
  const tripInfo = location.state.tripInfo;

  // useEffect(() => {
  //   setPrices(Array.from({ length: quantity }, (_, i) => (i + 1) * 10)); // Generate unique prices
  // }, [quantity]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Payment</h1>
        <h2>{tripInfo.name || "Trip Name"}</h2>
        <h3>Tickets</h3>

        <div>
        {tripInfo.tickets.map((ticket, i) => (
              <div key={i}>
                <h3>Ticket {i + 1}</h3>
                <p>Name: {tripInfo.tickets.name}</p>
                <p>Arrival Time: {tripInfo.tickets.arrival_time}</p>
                <p>Departure Time: {tripInfo.tickets.departure_time}</p>
                <p>Arrival Stop: {tripInfo.tickets.arrival_stop}</p>
                <p>Departure Stop: {tripInfo.tickets.departure_stop}</p>
                <p>Agency: {tripInfo.tickets.agency}</p>
                <p>Distance: {tripInfo.tickets.distance}</p>
                <p>Price: {tripInfo.tickets.price}</p>
              </div>
            ))}
        </div>
          
        

        <div>
          <h3>Quantity</h3>
          <p>{quantity}</p>
        </div>
        <div>
          <h3>Sub Total</h3>
          <p>{prices.reduce((a, b) => a + b, 0)}</p>
        </div>
        <div>
          <h3>Tax</h3>
          <p>{prices.reduce((a, b) => a + b, 0) / 10}</p>
        </div>
        <div>
          <h3>Total</h3>
          <p>
            {prices.reduce((a, b) => a + b, 0) +
              prices.reduce((a, b) => a + b, 0) / 10}
          </p>
        </div>
      </div>
      <div className="App-purchase">
        <form>
          <Link to="/">
            <div className="logo-circle">
              <img src={TicketSwiftLogo} alt="logo" />
            </div>
          </Link>
        </form>
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={{
              shape: "rect",
              layout: "vertical",
            }}
            createOrder={async () => {
              try {
                const response = await fetch(
                  "http://localhost:3001/api/orders",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    // use the "body" param to optionally pass additional order information
                    // like product ids and quantities
                    body: JSON.stringify({
                      cart: [
                        {
                          id: "YOUR_PRODUCT_ID",
                          quantity: "YOUR_PRODUCT_QUANTITY",
                          price: price / 2,
                        },
                      ],
                    }),
                  }
                );

                const orderData = await response.json();

                if (orderData.id) {
                  return orderData.id;
                } else {
                  const errorDetail = orderData?.details?.[0];
                  const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);

                  throw new Error(errorMessage);
                }
              } catch (error) {
                console.error(error);
                setMessage(`Could not initiate PayPal Checkout...${error}`);
              }
            }}
            onApprove={async (data, actions) => {
              try {
                const response = await fetch(
                  `http://localhost:3001/api/orders/${data.orderID}/capture`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );

                const orderData = await response.json();
                // Three cases to handle:
                //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                //   (2) Other non-recoverable errors -> Show a failure message
                //   (3) Successful transaction -> Show confirmation or thank you message

                const errorDetail = orderData?.details?.[0];

                if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                  // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                  // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                  return actions.restart();
                } else if (errorDetail) {
                  // (2) Other non-recoverable errors -> Show a failure message
                  throw new Error(
                    `${errorDetail.description} (${orderData.debug_id})`
                  );
                } else {
                  // (3) Successful transaction -> Show confirmation or thank you message
                  // Or go to another URL:  actions.redirect('thank_you.html');
                  const transaction =
                    orderData.purchase_units[0].payments.captures[0];
                  setMessage(
                    `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                  );
                  console.log(
                    "Capture result",
                    orderData,
                    JSON.stringify(orderData, null, 2)
                  );

                  const response = axios.post(
                    "http://localhost:3001/api/verify"
                  );
                }
              } catch (error) {
                console.error(error);
                setMessage(
                  `Sorry, your transaction could not be processed...${error}`
                );
              }
            }}
          />
        </PayPalScriptProvider>
        <Message content={message} />
      </div>
    </div>
  );
}

export default PaymentPage;
