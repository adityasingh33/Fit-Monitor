import mongoose from "mongoose";

const measureSchema = new mongoose.Schema({
      weigth:{type:Number , required: true},
      heigth:{type:Number , required: true},
      bmi:{type:Number , required: true}
});

export default mongoose.model("measure",measureSchema);