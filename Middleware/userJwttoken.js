import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const usertoken = (req,res,next)=>{
    try{
        const token = req.header["authorization"]

        if (!token){
            res.status(403).json({message:"token is not provide"})
        }

        jwt.verify(token,process.env.USER_JWT_SECRET_CODE,(err,decode)=>{
            if(err){
                res.status(201).json({message:"unauthorized"})
            }
            req.email = decode.email
            next()
        })
    }catch(error){
        return next(error)
    }
}