import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/rooms/${id}`);

        const priceCandidate = data?.price ?? data?.pricePerNight;
        let priceNum =
          typeof priceCandidate === "number"
            ? priceCandidate
            : parseInt(String(priceCandidate ?? "").replace(/[^0-9]/g, ""), 10);

        const typeNorm = typeof data?.type === "string" ? data.type.trim() : data?.type;
        const hint = String(typeNorm || data?.name || "").toLowerCase();

        if (!Number.isFinite(priceNum)) {
          if (hint.includes("executive")) priceNum = 8000;
          else if (hint.includes("suite")) priceNum = 7000;
          else if (hint.includes("delux")) priceNum = 4500; // covers 'delux' and 'deluxe'
          else if (hint.includes("standard")) priceNum = 3000;
          else if (hint.includes("family")) priceNum = 5500;
          else if (hint.includes("single")) priceNum = 2500;
          else if (hint.includes("double")) priceNum = 3500;
          else priceNum = 4000;
        }

        setRoom({
          ...data,
          price: priceNum,
          type: typeNorm,
          description: data?.description,
          amenities: Array.isArray(data?.amenities) ? data.amenities : [],
          image: data?.image,
        });
      } catch (error) {
        console.error("Error fetching room details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  if (loading) return <h3>Loading room details...</h3>;
  if (!room) return <h3>Room not found</h3>;

  return (
    <div className="room-details">
      <div className="room-details__media">
        <img src={room.image || "/images/default-room.jpg"} alt={room.name} />
      </div>
      <div className="room-details__info">
        <h2 className="room-details__title">{room.name}</h2>
        {room.type && <span className="badge-type" style={{ marginTop: 8 }}>{room.type}</span>}
        {room.description && <p className="room-details__desc">{room.description}</p>}
        <p className="room-details__price"><strong>Price:</strong> ₹{room.price} / night</p>
        {Number.isFinite(room?.capacity) && (
          <p><strong>Capacity:</strong> {room.capacity} persons</p>
        )}
        {room.amenities?.length > 0 && (
          <p><strong>Amenities:</strong> {room.amenities.join(", ")}</p>
        )}
      </div>
    </div>
  );
};

export default RoomDetails;