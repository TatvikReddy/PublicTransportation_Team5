import React, { useState, useEffect, useContext } from 'react';
import TicketSwiftLogo from '../TicketSwiftLogo.png';
import { Link } from 'react-router-dom';
import '../App.css';
import axios, { AxiosError } from "axios";
import QRCode from "react-qr-code";
import ReactDOM from "react-dom";

function QrMakerPage() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/makeqr');
            ReactDOM.render(<QRCode value={response.data}/>, document.getElementById("qr"));
            console.log(response.data); // Log the response from the server
            // Optionally, you can redirect the user to another page upon successful registration
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="qr-maker-page">
            <form onSubmit={handleSubmit}>
                <button type="submit" className="button create-account-button">
                    Create QR Code
                </button>
            </form>
            <div id="qr" style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
            </div>
        </div>
    );
}

export default QrMakerPage;