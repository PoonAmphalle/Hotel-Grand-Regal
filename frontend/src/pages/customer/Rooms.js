import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/rooms");

        const inferType = (text) => {
          const t = String(text || "").toLowerCase();
          if (t.includes("executive") && t.includes("suite")) return "Executive Suite";
          if (t.includes("executive")) return "Executive Suite";
          if (t.includes("suite")) return "Executive Suite";
          if (t.includes("delux")) return "Deluxe"; // covers 'delux' and 'deluxe'
          if (t.includes("standard")) return "Standard";
          if (t.includes("family")) return "Family";
          if (t.includes("single")) return "Single";
          if (t.includes("double")) return "Double";
          return null;
        };

        const normalized = (res.data || []).map((r) => {
          const priceCandidate = r?.price ?? r?.pricePerNight;
          let priceNum =
            typeof priceCandidate === "number"
              ? priceCandidate
              : parseInt(String(priceCandidate ?? "").replace(/[^0-9]/g, ""), 10);

          const typeNorm = typeof r?.type === "string" ? r.type.trim() : r?.type;
          const normalizedType = inferType(typeNorm) || inferType(r?.name) || typeNorm || undefined;

          if (!Number.isFinite(priceNum)) {
            const hint = String(normalizedType || r?.name || "").toLowerCase();
            if (hint.includes("executive")) priceNum = 8000;
            else if (hint.includes("suite")) priceNum = 7000;
            else if (hint.includes("delux") || hint.includes("deluxe")) priceNum = 4500;
            else if (hint.includes("standard")) priceNum = 3000;
            else if (hint.includes("family")) priceNum = 5500;
            else if (hint.includes("single")) priceNum = 2500;
            else if (hint.includes("double")) priceNum = 3500;
            else priceNum = 4000;
          }

          return { ...r, price: priceNum, type: typeNorm, normalizedType };
        });

        setRooms(normalized);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const types = useMemo(() => {
    const defaults = ["all", "Deluxe", "Executive Suite", "Standard", "Family", "Single", "Double"];
    const set = new Set(defaults);
    rooms.forEach((r) => {
      const t =
        typeof r?.normalizedType === "string"
          ? r.normalizedType
          : typeof r?.type === "string"
          ? r.type.trim()
          : "";
      if (t) set.add(t);
    });
    return Array.from(set);
  }, [rooms]);

  const filteredRooms = useMemo(() => {
    return rooms.filter((r) => {
      const t =
        typeof r?.normalizedType === "string"
          ? r.normalizedType
          : typeof r?.type === "string"
          ? r.type
          : "";
      const typeOk = typeFilter === "all" || t.toLowerCase().includes(typeFilter.toLowerCase());

      let priceOk = true;
      if (priceRange !== "all") {
        if (typeof r?.price !== "number") return false;
        if (priceRange === "0-2000") priceOk = r.price >= 0 && r.price <= 2000;
        else if (priceRange === "2000-5000") priceOk = r.price > 2000 && r.price <= 5000;
        else if (priceRange === "5000-10000") priceOk = r.price > 5000 && r.price <= 10000;
        else if (priceRange === ">10000") priceOk = r.price > 10000;
      }
      return typeOk && priceOk;
    });
  }, [rooms, typeFilter, priceRange]);

  const navigate = useNavigate();

  return (
    <div className="room-page">
      <h2 className="room-heading">Our Rooms</h2>

      <div className="room-filters">
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          {types.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All Types" : t}
            </option>
          ))}
        </select>
        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
          <option value="all">All Prices</option>
          <option value="0-2000">₹0 - ₹2,000</option>
          <option value="2000-5000">₹2,000 - ₹5,000</option>
          <option value="5000-10000">₹5,000 - ₹10,000</option>
          <option value=">10000">Above ₹10,000</option>
        </select>
      </div>

      <div className="room-container">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <button
              className="room-card"
              key={room._id}
              onClick={() => navigate(`/rooms/${room._id}`)}
            >
              <img src={room.image} alt={room.name} />
              <h3>{room.name}</h3>
              {room.description && <p>{room.description}</p>}
              <p className="room-price">Price: ₹{room.price} / night</p>
            </button>
          ))
        ) : (
          <p>No rooms found.</p>
        )}
      </div>
    </div>
  );
};

export default Rooms;