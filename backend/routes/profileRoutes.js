import express from "express";
import protect from "../middleware/authmiddleware.js"; // Ensure authentication
import { getProfile, updateProfile } from "../controllers/profileControllers.js"; // Use import instead of require

const router = express.Router();

// Route to get user profile
router.get("/", protect, getProfile);

// Route to update user profile
router.put("/", protect, updateProfile);

export default router; // Export the router correctly
