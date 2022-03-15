import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const location = useLocation();

  if (loading === false && isAuthenticated === false) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  if (loading === false && isAdmin === true && user.role !== "admin") {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
