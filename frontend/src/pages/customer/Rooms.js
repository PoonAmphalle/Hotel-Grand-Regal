import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getRooms } from "../../services/api";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await getRooms();

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
    <div className="container my-5">
      <h2 className="text-center mb-5">Our Luxurious Rooms</h2>
      
      <div className="row mb-5">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Filter by Room Type:</label>
          <select 
            className="form-select form-select-lg" 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{ borderColor: '#005f99' }}
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Room Types' : type}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Filter by Price Range (₹):</label>
          <select 
            className="form-select form-select-lg" 
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            style={{ borderColor: '#005f99' }}
          >
            <option value="all">All Price Ranges</option>
            <option value="0-2000">Under ₹2000</option>
            <option value="2000-5000">₹2000 - ₹5000</option>
            <option value="5000-10000">₹5000 - ₹10000</option>
            <option value=">10000">Over ₹10000</option>
          </select>
        </div>
      </div>

      {filteredRooms.length > 0 ? (
        <div className="row g-4">
          {filteredRooms.map((room) => (
            <div key={room._id} className="col-12 col-md-6 col-lg-4 d-flex">
              <div className="room-card h-100 w-100">
                <Link to={`/rooms/${room._id}`} className="room-card-link text-decoration-none">
                  <div className="card-img-container overflow-hidden" style={{ height: '200px' }}>
                    <img 
                      src={room.image || '/images/room-placeholder.jpg'}
                      alt={room.name}
                      className="card-img w-100 h-100 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Room+Image';
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title h5 fw-bold text-dark">{room.name}</h3>
                    <p className="card-text text-muted">
                      {room.description?.length > 150 
                        ? `${room.description.substring(0, 150)}...` 
                        : room.description || 'Experience luxury and comfort with our premium room amenities.'}
                    </p>
                    <div className="d-flex gap-3 mb-3">
                      <div className="d-flex align-items-center text-muted">
                        <i className="fas fa-ruler-combined me-2"></i>
                        <span>{room.size || '30'} m²</span>
                      </div>
                      <div className="d-flex align-items-center text-muted">
                        <i className="fas fa-user-friends me-2"></i>
                        <span>Max {room.capacity || 2}</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer bg-white border-top-0 d-flex justify-content-between align-items-center pt-0">
                    <span className="badge bg-light text-dark">
                      <i className="fas fa-hotel me-1"></i> {room.type || 'Standard'}
                    </span>
                    <span className="text-primary fw-bold">
                      ₹{room.price?.toLocaleString() || 'N/A'} <small className="text-muted">/night</small>
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-100 text-center py-5">
          <h4 className="mb-4">No rooms found matching your criteria</h4>
          <button 
            className="btn btn-outline-primary px-4 py-2"
            onClick={() => {
              setTypeFilter('all');
              setPriceRange('all');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Rooms;