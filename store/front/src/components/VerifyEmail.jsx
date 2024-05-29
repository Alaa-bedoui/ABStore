import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsVerifying(true);
      axios
        .get(`http://localhost:8080/abStore/verify-email/${token}`)
        .then((response) => {
          console.log("res", response.data);
          alert(response.data.message);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          alert("Verification failed: " + error);
        })
        .finally(() => {
          setIsVerifying(false);
        });
    }
  }, [location, navigate]);
  const handleVerifyClick = () => {
    const token = localStorage.getItem("token");
  
    // Make an API call to your backend to initiate the email verification process
    axios
      .post(`http://localhost:8080/abStore/verify-email`, { token })
      .then((response) => {
        console.log(response.data);
        alert("Verification initiated. Please check your email for further instructions.");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to initiate verification process: " + error);
      });
  };
  

  return (
    <div>
      <h2>Email Verification</h2>
      {isVerifying ? (
        <p>Verifying your email...</p>
      ) : (
        <button onClick={handleVerifyClick}>Verify Email</button>
      )}
    </div>
  );
};

export default VerifyEmail;
