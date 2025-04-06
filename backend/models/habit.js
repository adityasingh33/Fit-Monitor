import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    frequency: { type: Number, required: true }
});

const Habit = mongoose.model("habit", habitSchema);
export default Habit;