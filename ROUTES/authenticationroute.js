import express from "express"
import { signup } from "../CONTROLLER/userController.js"
import {login} from "../CONTROLLER/userController.js"
import uploadImage from "../Middleware/uploadImage.js"

const route = express.Router()

route.post("/register",uploadImage,signup)
route.post("/login",login)

export default route