import React, { useEffect, useState } from "react";
import axios from "axios";

function Dining() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu")
      .then((res) => setMenu(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Our Dining Menu</h2>
      <div className="row">
        {menu.map((item) => (
          <div className="col-md-4 mb-4" key={item._id}>
            <div className="card h-100">
              {item.image && (
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">
                  <strong>Category:</strong> {item.category}
                </p>
                <p className="card-text text-success fw-bold">
                  ₹{item.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dining;

