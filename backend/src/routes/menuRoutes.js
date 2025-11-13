import express from "express";
import { getMenuItems, getMenuItemById, addMenuItem, updateMenuItem, deleteMenuItem } from "../controllers/menuController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: get all menu items (frontend Dining consumes this)
router.get("/", getMenuItems);

// Public: get single menu item by ID
router.get("/:id", getMenuItemById);

// Admin: create/update menu items
router.post("/", protect, admin, addMenuItem);
router.put("/:id", protect, admin, updateMenuItem);
router.delete("/:id", protect, admin, deleteMenuItem);

export default router;
