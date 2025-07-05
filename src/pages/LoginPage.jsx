// src/pages/LoginPage.jsx

import React from "react";

const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>TODO LIST APP</h1>
      <button onClick={handleGoogleLogin}>
        Login with Google
      </button>
    </div>
  );
};

export default LoginPage;
