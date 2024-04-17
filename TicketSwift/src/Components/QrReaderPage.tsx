import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import TicketSwiftLogo from '../TicketSwiftLogo.png';
import axios, { AxiosError } from "axios";
import { Html5QrcodeScanner } from 'html5-qrcode';

function QrReaderPage() {
    const [scanResult, setScanResult] = useState(null)

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', { qrbox: { height: 250, width: 250 }, fps: 5 }, true);

        scanner.render(success, error);

        function success(result: any) {
            scanner.clear();
            try {
                const response = axios.post('http://localhost:3001/api/readqr', {
                    result
                });
                setScanResult(result);
            } catch (error) {
                console.log(error)
            }
        }

        function error(err: any) {
            console.log(err);
        }
    }, []);

    return (
        <div className="qr-reader-page">
            <h1>hello</h1>
            {scanResult
                ? <div>{scanResult}</div>
                : <div id="reader"></div>
            }
        </div>
    );
}

export default QrReaderPage;