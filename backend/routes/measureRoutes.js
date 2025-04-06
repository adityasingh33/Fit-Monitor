import express from "express";
import measure from "../models/measure.js"

const router = express.Router();

router.post("/add",async(req,res) => {
    try{
        const{weight,height,bmi} = req.body;
        const newMeasure = new measure({weight,height,bmi});
        await newMeasure.save();
        res.status(201).json({message:"Measurement created successfully",measure:newMeasure});
    }catch(error){
        res.status(500).json({eror: error.message});
    }
});

router.get("/",async(req,res)=> {
    try{
        const measures = await measure.find();
        res.status(200).json(measures); 
    }catch(error){
        res.status(500).json({error:error.message});
    }
})

router.put("/:id",async(req,res)=>{
    try{
        const updateMeasure = await measure.findByIdAndUpdate(req.params.id,req.body,{new : true});
         res.json(updateMeasure);
    }catch(error){
        res.status(500).json({error:error.message});
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        await measure.findByIdAndDelete(req.params.id);
        res.json({message:"Measurements deleted"});
    }catch(error){
        res.status(500).json({error:error.message});
    }
})

export default router;