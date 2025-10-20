import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (token) => {
    console.log("JWT Token:", token);
    navigate("/usddetails");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
