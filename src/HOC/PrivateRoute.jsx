import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); 
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/authentication" />
  );
};

export default PrivateRoute;