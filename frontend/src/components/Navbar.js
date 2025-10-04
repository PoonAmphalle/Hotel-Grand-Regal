import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let role = null;

  if (token) {
    try {
      const decoded = jwt_decode(token);
      role = decoded.role;
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Hotel Grand Regal</Link>{" | "}

      {role === "admin" && (
        <>
          <Link to="/admin/dashboard">Dashboard</Link>{" | "}
          <Link to="/admin/rooms">Manage Rooms</Link>{" | "}
          <Link to="/admin/menu">Manage Menu</Link>{" | "}
        </>
      )}

      {role === "customer" && (
        <>
          <Link to="/customer/home">Home</Link>{" | "}
          <Link to="/customer/menu">Menu</Link>{" | "}
        </>
      )}

      {token && <button onClick={handleLogout}>Logout</button>}
      {!token && (
        <>
          <Link to="/login">Login</Link>{" | "}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
