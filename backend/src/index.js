import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import roomRoutes from "./routes/roomRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import { seedAdminIfNeeded } from "./controllers/authController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

// Serve static images from public folder
app.use("/images", express.static(path.join(__dirname, "../public/images")));

// Connect to MongoDB
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hotelGrandRegal";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Ensure default admin exists (non-blocking)
seedAdminIfNeeded().catch((e) => console.warn("Admin seed skipped:", e?.message));

// Routes
app.use("/api/rooms", roomRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ratings", ratingRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("🏨 Hotel Grand Regal API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
