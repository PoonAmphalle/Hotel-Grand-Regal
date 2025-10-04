import { useState, useEffect } from "react";
import axios from "axios";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ number: "", type: "", price: "" });
  const [editRoomId, setEditRoomId] = useState(null); // <-- for edit mode
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRooms(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddRoom = async () => {
    try {
      await axios.post("/api/rooms", newRoom, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRooms();
      setNewRoom({ number: "", type: "", price: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditRoom = (room) => {
    setEditRoomId(room._id);
    setNewRoom({ number: room.number, type: room.type, price: room.price });
  };

  const handleUpdateRoom = async () => {
    try {
      await axios.put(`/api/rooms/${editRoomId}`, newRoom, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRooms();
      setNewRoom({ number: "", type: "", price: "" });
      setEditRoomId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      await axios.delete(`/api/rooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRooms();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Manage Rooms</h2>

      <div>
        <input
          type="text"
          placeholder="Room Number"
          value={newRoom.number}
          onChange={(e) => setNewRoom({ ...newRoom, number: e.target.value })}
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
        {editRoomId ? (
          <button onClick={handleUpdateRoom}>Update Room</button>
        ) : (
          <button onClick={handleAddRoom}>Add Room</button>
        )}
      </div>

      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            {room.number} - {room.type} - ${room.price}{" "}
            <button onClick={() => handleEditRoom(room)}>Edit</button>{" "}
            <button onClick={() => handleDeleteRoom(room._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageRooms;
