import express from "express"
import { createProduct, specificProduct, viewAllProduct } from "../CONTROLLER/adminProductController.js";
import uploadImage from "../Middleware/uploadImage.js";

const route = express.Router();



// Admin Login



route.post('/addproduct',uploadImage,createProduct);
route.get('/viewproducts',viewAllProduct)
route.get('/viewproducts/:id',specificProduct)


export default route