import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    clientId: { type: String, index: true },
    stars: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: "" },
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", ratingSchema);
export default Rating;
