import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");

  const navigate = useNavigate();
  const signup = () => {
    axios
      .post("http://4sm.h.filess.io:3307/abStore/signUp", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("Sign up successful", response.data);
      })
      .catch((error) => {
        console.error("Sign up error", error);
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
                setFirstName(e.target.value);
              }}
            />
            <label>
              <span style={{ transitionDelay: "0ms" }}>F</span>
              <span style={{ transitionDelay: "50ms" }}>I</span>
              <span style={{ transitionDelay: "100ms" }}>R</span>
              <span style={{ transitionDelay: "150ms" }}>S</span>
              <span style={{ transitionDelay: "200ms" }}>T</span>
              <span style={{ transitionDelay: "200ms" }}> </span>
              <span style={{ transitionDelay: "250ms" }}>N</span>
              <span style={{ transitionDelay: "250ms" }}>A</span>
              <span style={{ transitionDelay: "250ms" }}>M</span>
              <span style={{ transitionDelay: "250ms" }}>E</span>
            </label>
          </div>
          <div className="form-control">
            <input
              type="text"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label>
              <span style={{ transitionDelay: "0ms" }}>L</span>
              <span style={{ transitionDelay: "50ms" }}>A</span>
              <span style={{ transitionDelay: "100ms" }}>S</span>
              <span style={{ transitionDelay: "150ms" }}>T</span>
              <span style={{ transitionDelay: "200ms" }}> </span>
              <span style={{ transitionDelay: "250ms" }}>N</span>
              <span style={{ transitionDelay: "250ms" }}>A</span>
              <span style={{ transitionDelay: "250ms" }}>M</span>
              <span style={{ transitionDelay: "250ms" }}>E</span>
            </label>
          </div>
          <div className="form-control">
            <input
              type="text"
              required
              onChange={(e) => {
                setEmail(e.target.value);
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
              type="password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
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
        <button
          id="btn"
          style={{ color: "white" }}
          onClick={() => {
            signup();
            navigate("/AllItems/*");
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignUp;
