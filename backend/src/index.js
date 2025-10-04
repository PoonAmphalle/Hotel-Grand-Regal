const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("Hotel Grand Regal API is running");
});

// Import routes
const roomRoutes = require("./routes/roomRoutes");
const menuRoutes = require("./routes/menuRoutes");
const authRoutes = require("./routes/authRoutes"); // <-- Auth routes

// Use routes
app.use("/api/rooms", roomRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/auth", authRoutes); // <-- Added auth routes

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((error) => console.error("❌ MongoDB connection failed:", error));
