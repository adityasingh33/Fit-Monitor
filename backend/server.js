
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js";  
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";  
import measureRoutes from "./routes/measureRoutes.js"; 

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000", // Allow frontend domain
        credentials: true, // Allow cookies & authentication headers
    })
);

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Connection Error:", err));

// Routes
app.use("/api/habits", routes.habitRoutes);    
app.use("/api/measures", measureRoutes);  
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);  


app.get("/", (req, res) => {
    res.send("Habit Tracker APP is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
