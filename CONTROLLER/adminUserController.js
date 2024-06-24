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
// view all users data

export const viewallusers = async (req,res,next)=>{
    try{
        const user = await User.find()

        if(!user || user.length==0){
            return res.status(404).json({message:"user's not found"})
        }
        return res.status(200).json({message:"user's data fetched succussfully",data:user})
    }catch(error){
        return next(error)
    }
}

// view specific users data

export const viewspecificusers = async (req,res,next)=>{
    try{
        const id = req.params.id

        const user = await User.findById(id)

        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        return res.status(200).json({message:"user fetched succussfully",data:user})


    }catch(error){
        return next(error)
    }
}

// view a user data by name

export const viewuserbyname = async (req,res,next)=>{
    try{
        const name = req.params.name

        const user = await User.find({
            username:{$regex:new RegExp(name,"i")}
        })
        if(user.length==0){
            return res.status(404).json({message:"User not found"})
        }
        return res.status(200).json({message:"User fetched succussfully",data:user})
        }catch(error){
            return next(error)
        }
    }

    // user block and unblock

    export const userblockandunblock = async(req,res,next)=>{
        try{
            const id = req.params.id
            
            const user = await User.findById(id)

            if(!user){
                return res.status(404).json({message:"user not found"})
            }

            if(user.isDeleted == false){    
                (user.isDeleted = true)
                await user.save()   
                return res.status(200).json({message:"Blocked!"})
            }else{
                (user.isDeleted = false)
                await user.save()
                return res.status(200).json({message:"Unblocked"})
            }

        }catch(error){
            return next(error)
        }
    }