import React, { useState } from "react";
import axios from "axios";

function AddRoom() {
  const [form, setForm] = useState({
    name: "",
    pricePerNight: "",
    capacity: "",
    amenities: "",
    description: "",
    image: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert amenities string into array
      const roomData = { ...form, amenities: form.amenities.split(",") };
      await axios.post("http://localhost:5000/api/rooms", roomData);
      alert("Room added successfully!");
      setForm({
        name: "",
        pricePerNight: "",
        capacity: "",
        amenities: "",
        description: "",
        image: ""
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add room.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Room</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          type="text"
          name="name"
          placeholder="Room Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          type="number"
          name="pricePerNight"
          placeholder="Price per Night"
          value={form.pricePerNight}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={form.capacity}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          type="text"
          name="amenities"
          placeholder="Amenities (comma separated)"
          value={form.amenities}
          onChange={handleChange}
        />
        <textarea
          className="form-control mb-2"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          type="text"
          name="image"
          placeholder="Image Path (e.g. /images/room1.jpg)"
          value={form.image}
          onChange={handleChange}
        />
        <button className="btn btn-primary" type="submit">
          Add Room
        </button>
      </form>
    </div>
  );
}

export default AddRoom;
