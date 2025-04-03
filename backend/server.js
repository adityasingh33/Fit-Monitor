import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import routes from './routes/index.js';  
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('MongoDB Connection Error:', err));

    

// Routes
app.use("/api/habits", routes.habitRoutes);    
app.use("/api/measures", routes.measureRoutes); 
app.use("/api/auth", authRoutes);

// Health check route
app.get('/', (req, res) => {
    res.send("Habit Tracker APP is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));