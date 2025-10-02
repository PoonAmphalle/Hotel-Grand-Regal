import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Rooms from "./pages/Rooms";
import AddRoom from "./pages/AddRoom";
import RoomDetails from "./pages/RoomDetails";

function App() {
  return (
    <div>
      <nav style={{ margin: "10px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/add-room" style={{ marginLeft: "10px" }}>Add Room</Link>

      </nav>

      <Routes>
        <Route path="/" element={<h1>Welcome to Hotel Grand Regal</h1>} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
      </Routes>
    </div>
  );
}

export default App;
