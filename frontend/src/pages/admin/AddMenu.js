import React, { useState } from "react";
import axios from "axios";

function AddMenu() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/menu", form);
      alert("Menu item added successfully!");
      setForm({ name: "", description: "", price: "", category: "", image: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to add item.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        {/* 🔽 Category Dropdown instead of text input */}
        <select
          className="form-control mb-2"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>

        <input
          className="form-control mb-2"
          type="text"
          name="image"
          placeholder="Image Path (e.g. /images/paneer.jpg)"
          value={form.image}
          onChange={handleChange}
        />

        <button className="btn btn-primary" type="submit">
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AddMenu;
