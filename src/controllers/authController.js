import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const generateToken=(userId)=>{
  return jwt.sign({}, process.env.JWT_SECRET,{
    expiresIn:'1d'
   });
}
const registerUser=async(req, res)=>{
  const {userName, email, password}=req.body;
  try {
    // if(!userName ||  !email || !password)return res.status(400).json({message: "Please enter all values"});

  const check=await User.findOne({email});
  if(check)return res.status(400).json({message: "User already exist"});

  const hashPassword= await bcrypt.hash(password, 10);
  
  const user=await User.create({userName, email, password:hashPassword });
   console.log(user);
  // await user.save();

   res.status(200).json({
    _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    message: "User register success"
});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const loginUser=async(req,res)=>{
    const {email, password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user)return res.status(400).json({ message: "Invalid credentials" });

        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
          });
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}



export {registerUser, loginUser};