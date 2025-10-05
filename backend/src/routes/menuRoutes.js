const express = require("express");
const router = express.Router();
const {
  addMenuItem,       // <-- changed from createMenuItem
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");

const { protect, admin } = require("../middleware/authMiddleware");

// Get all menu items → any logged-in user
router.get("/", protect, getMenuItems);

// Admin-only routes
router.post("/", protect, admin, addMenuItem);  // <-- changed here too
router.put("/:id", protect, admin, updateMenuItem);
router.delete("/:id", protect, admin, deleteMenuItem);

module.exports = router;
