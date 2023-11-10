import User from "../models/User.js"
import bcrypt from 'bcrypt';

export const getAllUsers= async(req, res, next)=>{
    try {
      const users = await User.find();
      return res.status(200).json({Message:"Ok", users});
      next();
    } 
    catch (error) {
        console.log(error.message)
        return res.status(400).json({Message:"Error", Error:error.message});
    }
}

export const signUpUsers= async(req, res, next)=>{
    try {
        const{name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({Message:"Missing required fields"})
        }
        //Check email already created
        const createdEmail = await User.findOne({email})
        if(createdEmail){
            return res.status(400).json({Message:"Email already registred"})
        }

        //Hashing password
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({name,email,password:hashedPassword});
        return res.status(200).json({Message:"User created successfully", id:newUser._id.toString()})
    } 
    catch (error) {
        console.log(error.message);
        return res.status(400).json({Message:"ERROR"})
    }
}