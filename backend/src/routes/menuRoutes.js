const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// @route   GET /api/menu
// @desc    Get all menu items
router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/menu
// @desc    Add a new menu item
router.post("/", async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT /api/menu/:id
// @desc    Update menu item
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /api/menu/:id
// @desc    Delete menu item
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
