import React, { useState, useEffect, useContext } from 'react';
import {Link} from "react-router-dom";
import '../App.css';
import TicketSwiftLogo from '../TicketSwiftLogo.png';
import axios, { AxiosError } from "axios";
import { Html5QrcodeScanner } from 'html5-qrcode';

function QrReaderPage() {
    const [scanResult, setScanResult] = useState("")
    const [ticketName, setName] = useState("");
    const [to, setTo] = useState("");
    const [from, setFrom] = useState("");
    const [toTime, setToTime] = useState("");
    const [fromTime, setFromTime] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const options = ["Greyhound", "Flix Bus", "Other"];
    const [myValue, setMyValue] = useState(options[0]);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', { qrbox: { height: 250, width: 250 }, fps: 5 }, true);

        scanner.render(success, error);

        async function success(result: any) {
            scanner.clear();
            console.log(result)
            try {
                const response = await axios.post('http://localhost:3001/api/readqr', {
                    uuid: result
                })
                if (response.data === "Valid"){
                    const ticket = await axios.post('http://localhost:3001/api/ticket', {
                        uuid: result
                    })
                    setName(ticket.data.name);
                    setFrom(ticket.data.departure_stop);
                    setTo(ticket.data.arrival_stop);
                    setFromTime(ticket.data.departure_time.value.split('T')[0]);
                    setToTime(ticket.data.arrival_time.value.split('T')[0]);
                    setConfirmed(ticket.data.confirmed);
                    console.log(ticket.data)
                    console.log(ticket.data.confirmed)
                    console.log("confirmed: " + confirmed)
                    setScanResult("valid")
                }
                else {
                    setScanResult("whomp whomp")
                }
            } catch (error) {
                console.log("Whomp Whomp")
            }
        }

        function error(err: any) {
            console.log(err);
        }
    }, []);

    function reload() {window.location.reload()}

    return (
        <div className="qr-reader-page">
            <h1>Scan Ticket</h1>
            {/* <select
            onChange={(e) => setMyValue(e.target.value)}
            defaultValue={myValue}
        >
            {options.map((option, idx) => (
            <option key={idx}>{option}</option>
            ))}
        </select> */}
            {scanResult
                ? <>
                    <div style={{textAlign : "center"}}>
                        {scanResult === "valid" 
                            ? 
                            <>
                                {!confirmed
                                ? <>
                                    <h4>Ticket Confirmed!</h4>
                                    <p> {ticketName} </p>
                                    <p> {from} - {to} </p>
                                    <p> {fromTime} - {toTime} </p>
                                  </>
                                : <>
                                    <div style={{alignItems : "center"}}>
                                        <h4>Ticket Has Already Been Confirmed</h4>
                                        <p> {confirmed} </p>
                                    </div>
                                  </>
                                }
                            </>
                            : 
                            <>
                                <div style={{alignItems : "center"}}>
                                    <h4>Invalid QR, Not a Ticket</h4>
                                </div>
                            </>
                        }
                        <button className="button" onClick={ reload }>Scan Another</button>
                    </div>
                     </>
                 
                : <div id="reader"></div>
            }
        <Link to="/">
          <div className="logo-circle">
            <img src={TicketSwiftLogo} alt="logo" />
          </div>
        </Link>
        </div>
    );
}

export default QrReaderPage;