// backend/src/models/Room.js
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pricePerNight: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String], // array of strings
    default: [],
  },
  capacity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String, // image file name (e.g., "room1.jpg")
  },
});

module.exports = mongoose.model("Room", roomSchema);
