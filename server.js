import express from "express"
import { config } from "dotenv";
import mongoose from "mongoose";
import authenticationroute from "./ROUTES/authenticationroute.js";

config()
const PORT = process.env.PORT || 6788;
const app = express()
const DB = process.env.DB


mongoose.connect(DB)
.then(()=>console.log("db connected"))
  .catch((err)=>console.log(err));
  
  app.use(express.json())

  app.use("/api/users",authenticationroute);
  app.listen(PORT, () => {
    console.log(`Server running ${PORT}`) ;
  });
