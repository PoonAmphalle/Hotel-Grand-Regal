import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
  image: { type: String } // Optional image URL
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
