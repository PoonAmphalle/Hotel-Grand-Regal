import express from "express";
import { addRating, getSummary, getRecent } from "../controllers/ratingController.js";

const router = express.Router();

router.post("/", addRating);       // public submit
router.get("/summary", getSummary); // public summary
router.get("/recent", getRecent);   // recent list

export default router;
