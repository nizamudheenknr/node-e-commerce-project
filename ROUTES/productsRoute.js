import express from 'express'
import { productCategory, viewAllProduct, viewSpecificProduct } from '../CONTROLLER/userProductController.js'
import { addCart } from '../CONTROLLER/cartController.js'

const route = express.Router()

route.get('/products',viewAllProduct)
route.get('/viewProducts/:id',viewSpecificProduct)
route.get('/categoryProduct/:category',productCategory)
route.post('/productRemove')

// cart routes

route.post("/:userid/cart/:productid",addCart)

export default route