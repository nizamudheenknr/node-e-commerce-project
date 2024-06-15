import jwt from "jsonwebtoken"
import User from "../MODELS/userSchema.js"
import dotenv from "dotenv"

// admin login

export const adminLogin =  async (req,res,next)=>{
    try{
        const {email,password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign({email},process.env.ADMIN_JWT_SECRET_KEY)

            res.cookie('access_token',token,{httpOnly:true})
            .status(200).json({message:"admin login succcessfully",token})

        }else{
            return res.status(404).json({message:"unauthorized"})
        }
    }catch(error){
        return next(error)
    }
}