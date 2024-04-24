import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import '../App.css';
import axios, { AxiosError } from "axios";
import TicketSwiftLogo from '../TicketSwiftLogo.png';

function CreateAccountPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsAdmin(location.pathname === '/create-account-admin');
    }, [location]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const response = await axios.post(`http://localhost:3001/api/register`, {
                firstName,
                lastName,
                email,
                username,
                password,
                confirmPassword,
                securityQuestion,
                securityAnswer
            });
            console.log(response.data);
            alert(response.data.message);
        } catch (error) {
            if ((error as AxiosError).response) {
                console.error((error as AxiosError).response?.data);
                setErrorMessage(String((error as AxiosError).response?.data));
                alert(String((error as AxiosError).response?.data));
            } else if ((error as AxiosError).request) {
                console.error((error as AxiosError).request);
                setErrorMessage("No response received from the server. Please try again later.");
            } else {
                console.error('Error', (error as Error).message);
                setErrorMessage("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="register-page">
            <h1>Register</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', marginLeft: '55px'}}>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Enter first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            style={{ margin: '10px 0' }}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            style={{ margin: '10px 0' }}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ margin: '10px 0' }}
                        />
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{ margin: '10px 0' }}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ margin: '10px 0' }}
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Re-enter password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            style={{ margin: '10px 0' }}
                        />
                        <select
                            value={securityQuestion}
                            onChange={(e) => setSecurityQuestion(e.target.value)}
                            required
                            style={{ margin: '10px 0' }}>
                            <option value="">Select a security question...</option>
                            <option value="What is your favorite fruit?">What is your favorite fruit?</option>
                            <option value="What is your favorite brand of cereal?">What is your favorite brand of cereal?</option>
                            <option value="What is your mother's name?">What is your mother's name?</option>
                        </select>
                        <input
                            type="text"
                            name="securityAnswer"
                            placeholder="Enter security answer"
                            value={securityAnswer}
                            onChange={(e) => setSecurityAnswer(e.target.value)}
                            required
                            style={{ margin: '10px 0' }}
                        />
                    </div>
                    <button type="submit" className="button create-account-button">
                        Create Account
                    </button>
                    <Link to="/login" className="button">
                        <button className="button back-to-login-button">Back to Login</button>
                    </Link>
                    <Link to="/">
                        <div className="logo-circle">
                            <img src={TicketSwiftLogo} alt="logo" />
                        </div>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default CreateAccountPage;