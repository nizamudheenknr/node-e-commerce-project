import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authenticationroute from "./ROUTES/authenticationroute.js";
import adminRoute from "./ROUTES/adminRoute.js";
import productsRoute from './ROUTES/productsRoute.js'

dotenv.config();

const app = express();

mongoose
  .connect(process.env.DB)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/api/users", authenticationroute);
app.use("/api/admin", adminRoute);
app.use("/api/users",productsRoute)
const PORT = process.env.PORT || 6788;


console.log();
app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
