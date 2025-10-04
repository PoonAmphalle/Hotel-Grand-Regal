import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwt_decode(token);

    if (role && decoded.role !== role) {
      // User role does not match required role
      return <Navigate to="/" />;
    }

    return children;
  } catch (error) {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
