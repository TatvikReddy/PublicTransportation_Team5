import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios, { AxiosError } from "axios";

// Renders errors or successfull transactions on the screen.
function Message({ content }: any) {
  return <p>{content}</p>;
}



function PaymentPage() {
  const [trip, setTrip] = useState<any>();
  const [tickets, setTickets] = useState<any>();
  const [price, setPrice] = useState(0);
  const params = useParams();
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
        setTrip(response.data);
        setTickets(response.data.tickets);
        var temp = 0;
        for (let i in response.data.tickets){
          console.log(response.data.tickets[i])
          console.log(response.data.tickets[i].price)
          temp += response.data.tickets[i].price;
          console.log(price)
        }
        console.log(temp)
        setPrice(temp)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    
    fetchData();
  }, [])

  const initialOptions = {
    clientId: "test",
    "enable-funding": "paylater,venmo,card",
    "disable-funding": "",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };

  const [message, setMessage] = useState("");
  const [eachPrice, setEachPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [tax, setTax] = useState("");
  const [grandTotal, setGrandTotal] = useState("");

  const ticketList = tickets?.map(ticket => {
    return (
      <p>{`${ticket?.name}           $${ticket.price}`}</p>
    )
  })


  return (
    <div className="App-purchase">
      <p>Trip: {trip?.start} - {trip?.end}</p>
      <ul>{ ticketList }</ul>
      <p>Subtotal: {price}</p>
      <p>Tax: {Number((0.1 * (price)).toFixed(2))}</p>
      <p>Total: {Number(price + Number((0.1 * (price)).toFixed(2))).toFixed(2)}</p>
      
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
          }}
          createOrder={async () => {
            try {
              const response = await fetch("http://localhost:3001/api/orders", {
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
                      price: price
                    },
                  ],
                }),
              });

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
                const token = localStorage.getItem("token");
                console.log("token: " + token)
                const response = axios.post("http://localhost:3001/api/verify", {paypal : orderData, trip : trip, token: token});
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
  );
}

export default PaymentPage;
