import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const tipoUsuario = useSelector((state) => state.user.tipo_usuario);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      const tokenExpiration = JSON.parse(atob(accessToken.split('.')[1])).exp;
      const currentTime = Math.floor(Date.now() / 1000);
      if (tokenExpiration < currentTime) {
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/authentication" />;
  }

  return children;
};

export default PrivateRoute;