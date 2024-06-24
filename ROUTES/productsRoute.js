import express from 'express'
import { productCategory, viewAllProduct, viewSpecificProduct } from '../CONTROLLER/userProductController.js'
import { addCart, decrementItemQuantity, incrementItemQuantity,removecart,viewcart } from '../CONTROLLER/cartController.js'
import { addwishList, removeWishlist, viewWishList } from '../CONTROLLER/wishlistContrller.js'
import { payment, verifyPayment } from '../CONTROLLER/userPaymentController.js'

const route = express.Router()

route.get('/allproducts',viewAllProduct)
route.get('/viewProducts/:id',viewSpecificProduct)
route.get('/categoryProduct/:category',productCategory)

// cart routes

route.post("/:userid/cart/:productid",addCart)
route.get('/cart/:userid',viewcart)
route.delete('/:userid/cart/:productid/remove',removecart)
route.post('/:userid/cart/:productid/increment',incrementItemQuantity);
route.post('/:userid/cart/:productid/decrement',decrementItemQuantity)

// wishlist routes

route.post('/:userid/wishlist/:productid',addwishList)
route.get('/wishlist/:userid',viewWishList)
route.delete('/:userid/wishlist/:productid/remove',removeWishlist)

// payment
route.post('/:userid/payment',payment)
route.post('/:verifypayment',verifyPayment)
export default route