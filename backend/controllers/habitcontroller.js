import Habit from "../models/habit.js";

export const createHabit = async (req, res) => {
    try {
        const { name, frequency } = req.body;
        

        if (!name || !frequency) {
            return res.status(400).json({ message: "Name and frequency are required" });
        }

       
        const newHabit = new Habit({
            name,
            frequency,
            user: req.user.id,
        });

        await newHabit.save();
        res.status(201).json({ message: "Habit created successfully", habit: newHabit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ user: req.user.id }); 
        res.status(200).json(habits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateHabit = async (req, res) => {
    try {
        const updatedHabit = await Habit.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } 
        );

        if (!updatedHabit) {
            return res.status(404).json({ message: "Habit not found" });
        }

        res.status(200).json(updatedHabit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }

        await habit.deleteOne();
        res.status(200).json({ message: "Habit deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
