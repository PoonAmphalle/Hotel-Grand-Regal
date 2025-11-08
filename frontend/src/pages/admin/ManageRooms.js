import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ name: "", type: "", price: "", image: "", available: true });
  const [editRoomId, setEditRoomId] = useState(null); // <-- for edit mode
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data } = await api.get("/rooms");
      setRooms(data);
    } catch (error) {
      setMsg(error?.response?.data?.message || "Failed to load rooms");
    }
  };

  const handleAddRoom = async () => {
    try {
      await api.post("/rooms", newRoom);
      fetchRooms();
      setNewRoom({ name: "", type: "", price: "", image: "", available: true });
      setMsg("Room added");
    } catch (error) {
      setMsg(error?.response?.data?.message || "Failed to add room");
    }
  };

  const handleEditRoom = (room) => {
    setEditRoomId(room._id);
    setNewRoom({ name: room.name || "", type: room.type || "", price: room.price || "", image: room.image || "", available: room.available !== false });
  };

  const handleUpdateRoom = async () => {
    try {
      await api.put(`/rooms/${editRoomId}`, newRoom);
      fetchRooms();
      setNewRoom({ name: "", type: "", price: "", image: "", available: true });
      setEditRoomId(null);
      setMsg("Room updated");
    } catch (error) {
      setMsg(error?.response?.data?.message || "Failed to update room");
    }
  };

  // No delete per scope
  const handleDeleteRoom = async (id) => {
    if (!window.confirm("Delete this room?")) return;
    try {
      await api.delete(`/rooms/${id}`);
      fetchRooms();
      setMsg("Room deleted");
    } catch (error) {
      setMsg(error?.response?.data?.message || "Failed to delete room");
    }
  };

  return (
    <div>
      <div className="container" style={{ marginTop: 12, marginBottom: 12 }}>
        <Link className="btn btn-secondary" to="/admin/menu">Go to Manage Menu</Link>
      </div>
      <h2>Manage Rooms</h2>
      {msg && <p>{msg}</p>}

      <div>
        <input
          type="text"
          placeholder="Room Name"
          value={newRoom.name}
          onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type"
          value={newRoom.type}
          onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newRoom.price}
          onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image path (e.g., /images/room1.jpg)"
          value={newRoom.image}
          onChange={(e) => setNewRoom({ ...newRoom, image: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={newRoom.available}
            onChange={(e) => setNewRoom({ ...newRoom, available: e.target.checked })}
          />
          Available
        </label>
        {editRoomId ? (
          <button onClick={handleUpdateRoom}>Update Room</button>
        ) : (
          <button onClick={handleAddRoom}>Add Room</button>
        )}
      </div>

      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            {room.name || room.number} - {room.type} - ₹{room.price} - {room.available ? "Available" : "Unavailable"} - {room.image || ""}
            <button onClick={() => handleEditRoom(room)}>Edit</button>
            <button onClick={() => handleDeleteRoom(room._id)} style={{ marginLeft: 8 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageRooms;
