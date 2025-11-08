import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // No token → redirect to login
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // Optional: if route requires a specific role (e.g., admin)
    if (requiredRole && decoded.role !== requiredRole) {
      return <Navigate to="/" replace />;
    }

    // Token valid → allow access
    return children;
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
