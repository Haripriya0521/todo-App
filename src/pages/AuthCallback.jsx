import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const errorParam = params.get("error");

    if (errorParam) {
      setError("Login failed. Please try again.");
    } else if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      {error ? (
        <div style={{ color: "red" }}>
          <h2>Authentication Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate("/")}>Go back to Login</button>
        </div>
      ) : (
        <h2>Logging you in...</h2>
      )}
    </div>
  );
};

export default AuthCallback;
