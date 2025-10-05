const express = require("express");
const router = express.Router();

// Import controller functions
const { addRoom, getRooms, updateRoom, deleteRoom } = require("../controllers/roomController");

// Import middleware
const { protect, admin } = require("../middleware/authMiddleware");

// Public route → get all rooms
router.get("/", getRooms);

// Admin-only routes
router.post("/", protect, admin, addRoom);
router.put("/:id", protect, admin, updateRoom);
router.delete("/:id", protect, admin, deleteRoom);

// Export the router
module.exports = router;
