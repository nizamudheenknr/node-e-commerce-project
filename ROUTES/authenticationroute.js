import express from "express"
import { signup } from "../CONTROLLER/userController.js"
import {login} from "../CONTROLLER/userController.js"

const route = express.Router()

route.post("/register",signup)
route.post("/login",login)

export default route