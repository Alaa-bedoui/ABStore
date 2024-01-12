import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    axios
      .post("http://localhost:8080/abStore/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("Sign in successful", response.data);
        const token = response.data.token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
        navigate("/");
      })
      .catch((error) => {
        alert("Not Authorized");
        console.error("Sign in error", error);
      });
  };

  return (
    <div>
    <div id="login">
      <form action="" className="form_main">
        <div className="form-control">
          <input
            type="text"
            required
            onChange={(e) => {
              setemail(e.target.value);
            }}
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
            type="text"
            required
            onChange={(e) => {
              setpassword(e.target.value);
            }}
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
      </form>
     <button id="btn" onClick={(()=>{
      login()
     })}>Login</button>
        <button id="btn" onClick={(()=>{
      navigate('/signUp')
     })}>Sign Up</button>
    </div>
   
    </div>
  );
}

export default Login;
