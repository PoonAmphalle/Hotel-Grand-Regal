import { NavLink } from "react-router-dom";

export default function AdminSubnav() {
  const linkStyle = ({ isActive }) => ({
    padding: "8px 12px",
    borderRadius: 6,
    background: isActive ? "#005f99" : "transparent",
    color: isActive ? "#fff" : "#005f99",
    border: "1px solid #005f99",
    textDecoration: "none",
    fontWeight: 500,
  });

  return (
    <div className="container" style={{ marginTop: 12, marginBottom: 16 }}>
      <div style={{ display: "flex", gap: 10 }}>
        <NavLink to="/admin/dashboard" style={linkStyle}>Dashboard</NavLink>
        <NavLink to="/admin/menu" style={linkStyle}>Manage Menu</NavLink>
        <NavLink to="/admin/rooms" style={linkStyle}>Manage Rooms</NavLink>
      </div>
    </div>
  );
}
