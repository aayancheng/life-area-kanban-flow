
import React from "react";
import LandingPage from "@/components/LandingPage";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const Auth = () => {
  const { user } = useAuth();
  
  // If user is already authenticated, redirect to main page
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return <LandingPage />;
};

export default Auth;
