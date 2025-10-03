const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// @route   GET /api/rooms
// @desc    Get all rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/rooms
// @desc    Add a new room
router.post("/", async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT /api/rooms/:id
// @desc    Update a room
router.put("/:id", async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRoom) return res.status(404).json({ message: "Room not found" });
    res.json(updatedRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /api/rooms/:id
// @desc    Delete a room
router.delete("/:id", async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) return res.status(404).json({ message: "Room not found" });
    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
