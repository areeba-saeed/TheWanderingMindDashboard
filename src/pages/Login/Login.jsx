import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    var { uname, pass } = document.forms[0];

    if (name === "admin" && password === "Sstuauu8") {
      setIsSubmitted(true);
      localStorage.setItem("loggedIn", true);
      navigate("/dashboard");
      window.location.reload();
    } else {
      setErrorMessage("Incorrect credentials");
      setIsSubmitted(false);
    }
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          {isSubmitted ? (
            ""
          ) : (
            <div style={{ color: "red", fontSize: 15 }}>{errorMessage}</div>
          )}
          <label>Username </label>
          <input
            type="text"
            name="uname"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="pass"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="login">
      <div className="login-form">
        <div className="title">Sign In</div>
        {renderForm}
      </div>
    </div>
  );
};

export default Login;
