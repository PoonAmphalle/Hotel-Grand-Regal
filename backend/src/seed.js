import mongoose from "mongoose";
import dotenv from "dotenv";
import MenuItem from "./models/MenuItem.js";
import Room from "./models/Room.js";
import User from "./models/User.js";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hotelGrandRegal";

const menuSeed = [
  { name: "Veg Pizza", description: "Delicious cheesy veg pizza", price: 250, category: "Veg", image: "/images/dish1.jpg" },
  { name: "Paneer Tikka", description: "Spicy grilled paneer with veggies", price: 220, category: "Veg", image: "/images/dish2.webp" },
  { name: "Chicken Biryani", description: "Aromatic basmati rice with tender chicken and spices", price: 300, category: "Non-Veg", image: "/images/dish3.webp" }
];

const roomSeed = [
  { name: "Deluxe Room", type: "Deluxe", price: 3500, available: true, image: "/images/room1.jpg" },
  { name: "Executive Suite", type: "Suite", price: 8000, available: true, image: "/images/room2.jpg" },
  { name: "Standard Room", type: "Standard", price: 2500, available: true, image: "/images/room1.jpg" }
];

async function seed(reset = false) {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to Mongo");

  if (reset) {
    await Promise.all([MenuItem.deleteMany({}), Room.deleteMany({})]);
    console.log("Cleared MenuItem and Room collections");
  }

  // Ensure default admin exists
  const adminEmail = "admin@grandregal.com";
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = await User.create({ name: "Default Admin", email: adminEmail, password: "Admin@123", role: "admin" });
    console.log("Created default admin");
  }

  if ((await MenuItem.countDocuments()) === 0) {
    await MenuItem.insertMany(menuSeed);
    console.log("Inserted sample menu items");
  }

  if ((await Room.countDocuments()) === 0) {
    await Room.insertMany(roomSeed);
    console.log("Inserted sample rooms");
  }

  await mongoose.disconnect();
  console.log("Seed done");
}

const arg = process.argv[2];
seed(arg === "--reset").catch((e) => {
  console.error(e);
  process.exit(1);
});
