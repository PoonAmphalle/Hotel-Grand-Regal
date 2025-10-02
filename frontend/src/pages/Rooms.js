import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/rooms")
      .then((res) => setRooms(res.data))
      .catch((err) => console.error("Error fetching rooms:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Available Rooms</h2>
      <div className="row">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div className="col-md-4 mb-4" key={room._id}>
              <Link 
                to={`/rooms/${room._id}`} 
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="card shadow-sm">
                  <img
                    src={room.image}   // ✅ FIXED
                    className="card-img-top"
                    alt={room.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{room.name}</h5>
                    <p><b>Price:</b> ₹{room.pricePerNight} / night</p>
                    <p><b>Capacity:</b> {room.capacity}</p>
                    <p><b>Amenities:</b> {room.amenities.join(", ")}</p>
                    <p><b>Description:</b> {room.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No rooms found.</p>
        )}
      </div>
    </div>
  );
}

export default Rooms;
