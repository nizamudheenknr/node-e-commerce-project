import userjoi from "../VALIDATION/userValidation.js";
import User from "../MODELS/userSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



export const signup = async (req,res,next)=>{
    try{

        // incoming request validate by using Joi schema

        const {value,error}=userjoi.validate(req.body);

        //   For handle validation error (when error occur in validating time)
        if(error){
            return res.status(400).json({Details:error})
        }
        
        //   destructuring data

        const {username,email,password}=value;

        // Checking user already exist or not

        const userExistng = await User.findOne({email})
        
        // if the user exist

        if(userExistng){
            return res.status(400).json({ message: "Email already registered"})
        }
         
        // The password hashing

        const hashedpassword = await bcrypt.hash(password,15)

        // new user create and save it to the database

        const newUser = new User({
            username,
            email,
            password:hashedpassword,
            profileImg: req.cloudinaryImageUrl
        })

        // saving the new user

        await newUser.save()

        // user created succussfully

        return res.status(201).json({message:"user created succussfully",data:newUser})


    }catch(error){
        res.status(422).json({message:"error occured in validation",Details:error})

        next(error);
        
    }
   
};

// USER LOGIN

export const login = async (req,res,next)=>{
    try{
        const {email,password}=req.body;

        // Using findOne for to get a single user document
        
        const validUser = await User.findOne({email})

        if(!validUser){
          return res.status(404).json({message:"User not found"})
        }
        
        // Check if the account is suspended

        if(validUser.isDeleted == true){
           return res.status(400).json({ message:"Your account is suspended"})
        }

        // compare the enter password with hashed password

        const isValid = bcrypt.compareSync(password,validUser.password)
        if(!isValid){
          return res.status(401).json({message:"Entered password is incorrect"})
        }

        // JWT setting
          
        const token = jwt.sign({id:validUser._id},process.env.USER_JWT_SECRET_CODE)
         const {password:hashedpassword,...rest} = validUser._doc;

        //  setting cookie
          
         res.cookie('token_access',token,{httpOnly:true})
         res.status(200).json({message:"Login succussfully",token,data:rest})
    }catch(error){
        next(error)
    }
} 
