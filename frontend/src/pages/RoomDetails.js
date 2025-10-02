import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RoomDetails() {
  const { id } = useParams(); // get id from URL
  const [room, setRoom] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/rooms/${id}`)
      .then((res) => setRoom(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!room) return <h3>Loading...</h3>;

  return (
    <div className="container mt-4">
      <h2>{room.name}</h2>
      <img
        src={`/images/${room.image}`}
        alt={room.name}
        style={{ width: "60%", borderRadius: "10px" }}
      />
      <p><b>Price per night:</b> ₹{room.pricePerNight}</p>
      <p><b>Capacity:</b> {room.capacity}</p>
      <p><b>Amenities:</b> {room.amenities.join(", ")}</p>
      <p><b>Description:</b> {room.description}</p>
    </div>
  );
}

export default RoomDetails;
