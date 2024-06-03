import cart from "../MODELS/cartSchema.js"
import Product from "../MODELS/productSchema.js";
import User from "../MODELS/userSchema.js";

// add cart
export const addCart = async(req,res,next)=>{
    try{
        const userid = req.params.userid;
        const productid = req.params.productid;

        const user = await User.findById(userid)
        if(!user){
            res.status(404).json({message:"User not found"})
        }

        const product = await Product.findById(productid)

        if(!product){
            res.status(404).json({message:"product not found"})
        }
       let cartItem = await cart.findOne({ userId:user.id,productId:product._id})
       if(cartItem){
        res.status(200).json({message:"product already added inthe cart"})
       }else{
        cartItem = await cart.create({
            userId:user._id,
            productId:product._id,
            quantity:1
        })
        user.cart.push(cartItem._id)
        await user.save()
        res.status(200).json({message:"the product has been successfully added to your cart."})
       }

    }catch(error){
        next(error)
    }
}