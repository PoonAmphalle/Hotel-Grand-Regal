import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container my-4">
      <h2>Admin Dashboard</h2>
      <p>Manage rooms, menu items, and view hotel stats here.</p>

      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <Link className="btn btn-primary" to="/admin/menu">Manage Menu</Link>
        <Link className="btn btn-secondary" to="/admin/rooms">Manage Rooms</Link>
      </div>
    </div>
  );
};

export default Dashboard;
