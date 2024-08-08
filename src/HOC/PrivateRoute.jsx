import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const tipoUsuario = useSelector((state) => state.user.tipo_usuario);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); 
  }, []);

  console.log('Loading:', loading);
  console.log('Is Authenticated:', isAuthenticated);
  console.log('User Type:', tipoUsuario);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/authentication" />;
  }

  return children;
};

export default PrivateRoute;