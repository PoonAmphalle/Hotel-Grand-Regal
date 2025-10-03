const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Import room routes
const roomRoutes = require("./routes/roomRoutes");
// Import menu routes 👇
const menuRoutes = require("./routes/menuRoutes");

// Use routes
app.use("/api/rooms", roomRoutes);
// Use menu routes 👇
app.use("/api/menu", menuRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((error) => console.error("❌ MongoDB connection failed:", error));
