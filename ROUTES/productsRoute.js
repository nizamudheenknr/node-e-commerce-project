import express from 'express'
import { viewAllProduct, viewSpecificProduct } from '../CONTROLLER/userProductController.js'

const route = express.Router()

route.get('/products',viewAllProduct)
route.get('/viewproducts/:id',viewSpecificProduct)

export default route