import React, { useEffect, useState } from "react";
import axios from "axios";

function ManageRooms() {
  const [rooms, setRooms] = useState([]);
  const [editRoom, setEditRoom] = useState(null);

  // Fetch rooms
  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Delete room
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      await axios.delete(`http://localhost:5000/api/rooms/${id}`);
      fetchRooms();
    }
  };

  // Update room
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const roomData = { ...editRoom, amenities: editRoom.amenities.split(",") };
      await axios.put(`http://localhost:5000/api/rooms/${editRoom._id}`, roomData);
      setEditRoom(null);
      fetchRooms();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Rooms</h2>

      {rooms.length === 0 && <p>No rooms found.</p>}

      {editRoom ? (
        <form onSubmit={handleUpdate} className="mb-4">
          <input
            className="form-control mb-2"
            type="text"
            value={editRoom.name}
            onChange={(e) => setEditRoom({ ...editRoom, name: e.target.value })}
            placeholder="Room Name"
          />
          <input
            className="form-control mb-2"
            type="number"
            value={editRoom.pricePerNight}
            onChange={(e) => setEditRoom({ ...editRoom, pricePerNight: e.target.value })}
            placeholder="Price Per Night"
          />
          <input
            className="form-control mb-2"
            type="number"
            value={editRoom.capacity}
            onChange={(e) => setEditRoom({ ...editRoom, capacity: e.target.value })}
            placeholder="Capacity"
          />
          <input
            className="form-control mb-2"
            type="text"
            value={editRoom.amenities}
            onChange={(e) => setEditRoom({ ...editRoom, amenities: e.target.value })}
            placeholder="Amenities (comma separated)"
          />
          <textarea
            className="form-control mb-2"
            value={editRoom.description}
            onChange={(e) => setEditRoom({ ...editRoom, description: e.target.value })}
            placeholder="Description"
          />
          <input
            className="form-control mb-2"
            type="text"
            value={editRoom.image}
            onChange={(e) => setEditRoom({ ...editRoom, image: e.target.value })}
            placeholder="Image URL"
          />
          <button className="btn btn-success" type="submit">Update</button>
          <button
            className="btn btn-secondary ms-2"
            type="button"
            onClick={() => setEditRoom(null)}
          >
            Cancel
          </button>
        </form>
      ) : null}

      <ul className="list-group">
        {rooms.map((room) => (
          <li
            key={room._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {room.name} - ₹{room.pricePerNight}
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() =>
                  setEditRoom({
                    ...room,
                    amenities: room.amenities ? room.amenities.join(",") : ""
                  })
                }
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(room._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageRooms;
