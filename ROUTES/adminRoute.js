import express from "express"
import { createProduct, specificProduct, viewAllProduct,} from "../CONTROLLER/adminProductController.js";
import uploadImage from "../Middleware/uploadImage.js";
import { adminLogin } from "../CONTROLLER/adminUserController.js";
import { admintoken } from "../Middleware/adminJwtToken.js";

const route = express.Router();



// Admin Login
route.post('/admin/login',adminLogin)

route.use(admintoken)


// PRODUCT CONTROLLER
route.post('/addproduct',uploadImage,createProduct);
route.get('/viewproducts',viewAllProduct)
route.get('/viewproducts/:id',specificProduct)


export default route