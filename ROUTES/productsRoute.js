import express from 'express'
import { productCategory, viewAllProduct, viewSpecificProduct } from '../CONTROLLER/userProductController.js'

const route = express.Router()

route.get('/products',viewAllProduct)
route.get('/viewProducts/:id',viewSpecificProduct)
route.get('/categoryProduct/:category',productCategory)

export default route