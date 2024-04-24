import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../App.css";
import TicketSwiftLogo from "../TicketSwiftLogo.png";
import axios from "axios";
import Profile from "../profilepic.png";
import ScrollSpy from "react-ui-scrollspy";
import { Button, Divider, Loader, Modal } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import QRCode from "react-qr-code";
import ReactDOM from "react-dom";

function ViewProfilePage() {

  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(0);
  const [ticketName, setName] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [toTime, setToTime] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [agency, setAgency] = useState("");
  const [uuid, setUuid] = useState("");
  const handleOpen = (name, to, from, toTime, fromTime, uuid, event) => {
    setName(name)
    setTo(to)
    setFrom(from)
    setOpen(true)
    setToTime(toTime)
    setFromTime(fromTime)
    setUuid(uuid)
    // setAgency(agency)
  };
  const handleClose = () => setOpen(false);

  const handleEnter = () => {
    setTimeout(() => setRows(10), 1000);
  };

  interface Trip {
    uuid: string;
    start: string;
    end: string;
    tickets: Ticket[];
    // other properties...
  }

  interface Ticket {
    uuid: string;
    departure_stop: string;
    arrival_stop: string;
    name: string;
    departure_time;
    arrival_time;
    agency: [];
    // other properties...
  }

  interface UserInfo {
    name: string;
    email: string;
    paymentInfo: string;
    travelHistory: string;
    trips: Trip[];
  }

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    paymentInfo: "",
    travelHistory: "",
    trips: []
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Placeholder for fetching data from database
    // replace this with your actual data fetching logic
    async function fetchUserData() {
      try {
        // this apparently imulate an API call
        const response = await axios.post(
          "http://localhost:3001/api/userinfo",
          {
            token,
          }
        );
        console.log(response);
        setUserInfo(response.data); // Get from API to set user email to local variable
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []); // Empty dependency array means this effect runs once on mount

  // Event handler for the Report Issue button
  const handleReportIssue = () => {
    // Replace this with the actual logic, such as showing a form or modal
    console.log("Report issue clicked");
  };
  const response = axios.post(
    "http://localhost:3001/api/trips",
    {
      token: token
    }
  );

  //logging promise
  console.log(response)



  //currently fetching all trips but is being weird with typing
  const tripList = userInfo?.trips?.map(trip => {
    const ticketList = trip.tickets.map(ticket => {
      return (

        <>
          <Button onClick={(event) =>
            handleOpen(ticket.name, ticket.arrival_stop, ticket.departure_stop, ticket.arrival_time.value.split('T')[0] + " " + ticket.arrival_time.text, ticket.departure_time.value.split('T')[0] + " " + ticket.departure_time.text, ticket.uuid, event)}>{ticket.name}</Button>
          <Modal
            open={open}
            onClose={handleClose}
            // onEntered={handleEnter} 
            onExited={() => {
              setRows(0);
            }}
          >
            <Modal.Header>
              <Modal.Title><h5>{ticketName} {ticket.arrival_time.value.split('T')[0] + " " + ticket.arrival_time.text}</h5></Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <div style={{textAlign: "center"}}>

                {/* <h4>Greyhound</h4> */}

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                  <div style={{ flex: '1 0 30%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>From</span>
                    <span >
                      {from}
                    </span>
                    <span >
                      {fromTime}
                    </span>
                  </div>
                  <div style={{ flex: '1 0 30%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>To</span>
                    <span >
                      {to}
                    </span>
                    <span >
                      {toTime}
                    </span>
                  </div>
                </div>
                <br></br>
              <QRCode value={uuid} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleClose}
                appearance="primary" color="red">
                Ok
              </Button>
              <Button onClick={handleClose}
                appearance="subtle">
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    })
    return (
      <div style={{ border: '2px solid black', marginRight: '10px' }}>
        <p>{trip.start} - {trip.end} </p>
        <ul> {ticketList} </ul>
      </div>
    )
  })

  userInfo?.trips?.reverse();

  return (
    <div className="view-profile-page">
      <h2>View Profile</h2>

      <div className="profile-image-container">
        <img src={Profile} alt="Profile" />
      </div>

      <button className="button email-button">Email: {userInfo.email}</button>

      <div style={{ overflowY: "auto", height: "200px", width: "600px", background: "white" }}>
        <ul> {tripList} </ul>
      </div>

      <Link to="/report-issue" className="button">
        <button className="button report-issue-button">Report Issue</button>
      </Link>

      

      <Link to="/reset-password" className="button">
        <button className="button reset-password-button">Reset Password</button>
      </Link>

      <Link to="/readqr" className="button">
        <button className="button">Read QR</button>
      </Link>
      {/* {isAdmin && (
        <Link to="/readqr" className="button">
          <button className="button">Read QR</button>
        </Link>
      )} */}

      <Link to="/">
        <div className="logo-circle">
          <img src={TicketSwiftLogo} alt="logo" />
        </div>
      </Link>
    </div>

    //
  );
}

export default ViewProfilePage;
