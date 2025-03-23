// import express from "express";
// import { createHabit, getHabits, updateHabit, deleteHabit } from "../controllers/habitcontroller.js";
// import authMiddleware from "../middleware/authmiddleware.js";

// const router = express.Router();

// router.post("/add", authMiddleware, createHabit); 
// router.get("/", authMiddleware, getHabits);
// router.put("/:id", authMiddleware, updateHabit); 
// router.delete("/:id", authMiddleware, deleteHabit); 

// export default router;

import express from "express";
import Habit from "../models/habit.js";
import authMiddleware from "../middleware/authmiddleware.js"; 

const router = express.Router();


router.post("/add", authMiddleware, async (req, res) => {
    try {
        const { name, frequency } = req.body;
        const newHabit = new Habit({ name, frequency });
        await newHabit.save();
        res.status(201).json({ message: "Habit created successfully", habit: newHabit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/", authMiddleware, async (req, res) => {
    try {
        const habits = await Habit.find();
        res.status(200).json(habits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedHabit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await Habit.findByIdAndDelete(req.params.id);
        res.json({ message: "Habit deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;