import User from '../models/user.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerUser = async(req,res) =>{
    try{
        const {name,email,password} = req.body;

        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);


        user = new User({name,email,password:hashedPassword});
        await user.save();

        res.status(201).json({message : 'User registered successfully'});
    }catch(error){
        res.status(500).json({message:"Server Error",error:error.message});
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

       
        const user = await User.findOne({ email });
        if (!user  || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

      
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
//
        res.cookie("token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite : "Strict",
            maxAge : 60*60*1000
        })
//
        res.status(200).json({ message: "Login successful" });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


export { registerUser, loginUser };
