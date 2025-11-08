import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="navbar-brand">Hotel Grand Regal</h2>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/rooms">Rooms</Link></li>
          <li><Link to="/dining">Dining</Link></li>
          <li><Link to="/banquet">Banquet Hall</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {token ? (
            <li><button onClick={handleLogout} style={{ background:"transparent", border:"none", color:"white", cursor:"pointer" }}>Logout</button></li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;


