import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import TicketSwiftLogo from "../TicketSwiftLogo.png";
import axios, { AxiosError } from "axios";

function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/resetpassword",
        {
          email,
          password,
          confirmPassword,
          securityQuestion,
          securityAnswer,
        }
      );

      setSuccessMsg(
        "Password reset successfully. Please login with your new password."
      );
      // Optionally, you can redirect the user to another page upon successful registration
    } catch (err: any | AxiosError) {
      console.log(err.response?.data);
      setErrorMsg(
        err.response?.data || "An error occurred during resetting the password."
      );
    }
  };


  return (
    <div className="reset-password-page">
      <h2>Reset Password</h2>
      <p style={{ color: "red" }}>{errorMsg}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Re-enter new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <select
          value={securityQuestion}
          onChange={(e) => setSecurityQuestion(e.target.value)}
          required
        >
          <option value="">Please select a security question...</option>
          <option value="What is your favorite fruit?">
            What is your favorite fruit?
          </option>
          <option value="What is your favorite brand of cereal?">
            What is your favorite brand of cereal?
          </option>
          <option value="What is your mother's name?">
            What is your mother's name?
          </option>
        </select>
        <input
          type="text"
          placeholder="Enter security answer"
          value={securityAnswer}
          onChange={(e) => setSecurityAnswer(e.target.value)}
          required
        />
        <button type="submit" className="button reset-password-button">
          Reset Password
        </button>
      </form>
      <p style={{ color: "green" }}>{successMsg}</p>
      <Link to="/login" className="button">
        <button className="button back-to-login-button">Back to Login</button>
      </Link>
      <Link to="/">
        <div className="logo-circle">
          <img src={TicketSwiftLogo} alt="logo" />
        </div>
      </Link>
    </div>
  );
}

export default ResetPasswordPage;