import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:8080/abStore/login", {
        email: email,
        password: password,
      });
      console.log("Sign in successful", response.data);
      const token = response.data.token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      setError("An error occurred");
      setOpenSnackbar(true);
      setSnackbarMessage("Login failed. Please check your credentials.");
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div>
      {error && (
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error">{snackbarMessage}</Alert>
        </Snackbar>
      )}
      <div id="login">
        <form onSubmit={handleFormSubmit} className="form_main">
          <div className="form-control">
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>
              <span style={{ transitionDelay: "0ms" }}>E</span>
              <span style={{ transitionDelay: "50ms" }}>-</span>
              <span style={{ transitionDelay: "100ms" }}>M</span>
              <span style={{ transitionDelay: "150ms" }}>A</span>
              <span style={{ transitionDelay: "200ms" }}>I</span>
              <span style={{ transitionDelay: "250ms" }}>L</span>
            </label>
          </div>
          <div className="form-control">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>
              <span style={{ transitionDelay: "0ms" }}>P</span>
              <span style={{ transitionDelay: "50ms" }}>A</span>
              <span style={{ transitionDelay: "100ms" }}>S</span>
              <span style={{ transitionDelay: "150ms" }}>S</span>
              <span style={{ transitionDelay: "200ms" }}>W</span>
              <span style={{ transitionDelay: "250ms" }}>O</span>
              <span style={{ transitionDelay: "250ms" }}>R</span>
              <span style={{ transitionDelay: "250ms" }}>D</span>
            </label>
          </div>
          <button style={{ color: "white" }} id="btn" type="submit">Login</button>
        </form>
        Don't have an account? 
        <br></br>
        <button style={{ color: "white" }} id="btn" onClick={() => navigate('/signUp')}>Sign Up</button>
      </div>
    </div>
  );
}

export default Login;
