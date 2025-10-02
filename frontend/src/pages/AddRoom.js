import React, { useState } from "react";
import axios from "axios";

function AddRoom() {
  const [formData, setFormData] = useState({
    name: "",
    pricePerNight: "",
    amenities: "",
    capacity: "",
    description: "",
    image: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const roomData = {
        ...formData,
        pricePerNight: Number(formData.pricePerNight),
        capacity: Number(formData.capacity),
        amenities: formData.amenities.split(",") // convert CSV to array
      };

      await axios.post("http://localhost:5000/api/rooms", roomData);
      alert("Room added successfully!");
    } catch (err) {
      console.error(err);
      alert("Error adding room");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Room</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Room Name" onChange={handleChange} required /><br />
        <input type="number" name="pricePerNight" placeholder="Price Per Night" onChange={handleChange} required /><br />
        <input type="text" name="amenities" placeholder="Amenities (comma separated)" onChange={handleChange} /><br />
        <input type="number" name="capacity" placeholder="Capacity" onChange={handleChange} required /><br />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} /><br />
        <input type="text" name="image" placeholder="Image URL" onChange={handleChange} /><br />
        <button type="submit">Add Room</button>
      </form>
    </div>
  );
}

export default AddRoom;
