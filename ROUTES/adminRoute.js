import express from "express"
import { createProduct, productupdate, removeProduct, specificProduct, viewAllProduct, viewCategory,} from "../CONTROLLER/adminProductController.js";
import uploadImage from "../Middleware/uploadImage.js";
import { adminLogin, userblockandunblock, viewallusers, viewspecificusers, viewuserbyname } from "../CONTROLLER/adminUserController.js";
import { admintoken } from "../Middleware/adminJwtToken.js";

const route = express.Router();



// Admin Login
route.post('/login',adminLogin)

route.use(admintoken)


// PRODUCT CONTROLLER
route.post('/addproduct',uploadImage,createProduct);
route.get('/viewproducts',viewAllProduct)
route.get('/viewproducts/:id',specificProduct)
route.get('/viewproduct/:category',viewCategory)
route.patch('/updateproduct/:id',productupdate)
route.delete('/deleteproduct/:id',removeProduct)


// USER CONTROLLER

route.get('/usersdata',viewallusers)
route.get('/specificuserdata/:id',viewspecificusers)
route.get('/viewuserbyname/:name',viewuserbyname)
route.patch('/user/Block&unblock/:id',userblockandunblock)

export default route