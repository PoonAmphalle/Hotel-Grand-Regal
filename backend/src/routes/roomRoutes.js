const express = require("express");
const router = express.Router();
const {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");

const { protect, admin } = require("../middleware/authMiddleware");

// Get all rooms → any logged-in user
router.get("/", protect, getRooms);

// Admin-only routes
router.post("/", protect, admin, createRoom);
router.put("/:id", protect, admin, updateRoom);
router.delete("/:id", protect, admin, deleteRoom);

module.exports = router;
