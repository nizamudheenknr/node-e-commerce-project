import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    profileImg:{
        type:String,
    
     },
  
    accountCreatedDate:{
        type:Date,
        default:Date.now,
        required:true,
    },
    isDeleted:{
        type:Boolean,
        default:false,
    }
    
})
const User = mongoose.model("User",userSchema)
export default User;
