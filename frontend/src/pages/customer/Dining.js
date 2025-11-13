import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getDining } from "../../services/api";
import "./Dining.css";

function Dining() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  // normalize any backend/public shape into a displayable image URL
  const toImageUrl = (item) => {
    const val =
      item?.image ??
      item?.imageUrl ??
      item?.photo ??
      item?.url ??
      item?.path ??
      null;

    const fromString = (s) => {
      if (!s) return null;
      // Absolute URLs or data URIs
      if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("data:")) return s;
      // Public asset path (served by React from /public) — keep as-is
      if (s.startsWith("/")) return s;
      // Backend relative path (e.g., uploads/...) — use relative path
      return `/${s}`;
    };

    if (typeof val === "string") return fromString(val);
    if (val && typeof val === "object") {
      // Support shapes like { url, path } or { data, contentType }
      if (typeof val.url === "string") return fromString(val.url);
      if (typeof val.path === "string") return fromString(val.path);
      if (val.data && (val.contentType || val.mimeType)) {
        const type = val.contentType || val.mimeType || "image/jpeg";
        return `data:${type};base64,${val.data}`;
      }
    }
    // final fallback placeholder
    return "https://via.placeholder.com/600x400?text=Dish";
  };

  useEffect(() => {
    getDining()
      .then((response) => {
        const data = response.data || [];
        console.log("Fetched menu items:", data);
        setMenu(data);
        setFilteredMenu(data);
      })
      .catch((err) => console.error("Error fetching menu:", err));
  }, []);

  // filter logic
  useEffect(() => {
    let filtered = [...menu];

    if (category) {
      filtered = filtered.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      filtered = filtered.filter((item) =>
        String(item.name || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    setFilteredMenu(filtered);
  }, [category, search, menu]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5">Our Exquisite Dining Experience</h2>
      
      <div className="row mb-5">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Filter by Category:</label>
          <select 
            className="form-select form-select-lg" 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ borderColor: '#005f99' }}
          >
            <option value="">All Categories</option>
            <option value="Veg">Vegetarian</option>
            <option value="Non-Veg">Non-Vegetarian</option>
            <option value="Appetizer">Appetizers</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Desserts</option>
            <option value="Beverage">Beverages</option>
          </select>
        </div>
        
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Search Menu:</label>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search for dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ borderColor: '#005f99' }}
          />
        </div>
      </div>

      {filteredMenu.length > 0 ? (
        <div className="dining-container">
          <div className="dining-grid">
            {filteredMenu.map((dish) => (
              <div 
                key={dish._id} 
                className="dining-card"
                onClick={() => navigate(`/dining/${dish._id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="dining-card-img-container">
                  <img 
                    src={dish._imageSrc} 
                    alt={dish.name}
                    className="dining-image"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Dish+Image';
                    }}
                  />
                </div>
                <div className="dining-content">
                  <h3>{dish.name}</h3>
                  <p>{dish.description || 'Delicious dish prepared with care and fresh ingredients.'}</p>
                  <div className="d-flex justify-content-end align-items-center mt-auto">
                    <span className="fw-bold text-primary">₹{dish.price?.toLocaleString() || 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-5">
          <h4>No dishes found matching your criteria</h4>
          <button 
            className="btn btn-outline-primary mt-3"
            onClick={() => {
              setCategory('');
              setSearch('');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Dining;