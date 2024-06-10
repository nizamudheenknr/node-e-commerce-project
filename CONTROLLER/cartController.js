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
           return res.status(404).json({message:"User not found"})
        }

        const product = await Product.findById(productid)

        if(!product){
           return res.status(404).json({message:"product not found"})
        }
        if (!user.cart) {
            user.cart = [];
        }
       let cartItem = await cart.findOne({ userId:user.id,productId:product._id})
       if(cartItem){
        return res.status(200).json({message:"product already added inthe cart"})
       }else{
        cartItem = await cart.create({
            userId:user._id,
            productId:product._id,
            quantity:1
        })
        user.cart.push(cartItem._id)
        await user.save()
        return res.status(200).json({message:"the product has been successfully added to your cart."})
       }

    }catch(error){
        next(error)
    }
}


//  view the user cart


export const viewcart = async (req,res,next)=>{
    try{
        const id = req.params.userid;
        const user = await User.findById(id).populate({
            path:"cart",
            populate:{path:"productId"}
        })
        if(!user){
            res.status(404).json({message:"User not found"})
        }
        if(!user.cart || user.cart.length === 0){
            res.status(200).json({message:"Cart is empty"})
        }
        res.status(200).json(user.cart)
    }catch(error){
        return next(error)
    }
}

// REMOVE A CART

export const removecart= async (req,res,next)=>{
    try{
        const userid=req.params.userid
        const productid=req.params.productid

        const user = await User.findById(userId)
        if(!user){
            res.status(404).json({message:"User not found"})
        }

        const product = await product.findById(productid)
        if(!product){
            res.status(404).json({message:"Product not found"})
        }

        const cartItem = await cart.findOneAndDelete({userId: user._id, productId: product._id})
        if(!cartItem){
            res.status(404).json({message:"product not found in the cart"})
        }

        const cartItemIndex = await user.cart.findIndex(item => item.equals(cartItem._id))
        if(cartItemIndex !== -1){
            user.cart.splice(cartItemIndex,1)
            await user.save()
        }
        res.status(200).json({message:"product removed successfully"})
    }catch(error){
        next(error)
    }
}

// quatity increment in the cart

export const incrementItemQuantity=async(req,res,next)=>{
    try{
        const userid=req.params.userid;
        const productid= req.params.userid;
        const {ItemQuantity} = req.body

        const user =await User.findById(userid)
        if(!user){
            res.status(404).json({message:"User not found"})
        }
        const product = await Product.findById(productid)
        if(!product){
            res.status(404).json({message:"Product not found"})
        }
        const Item = await cart.findOne({userId:user_id,productId:product._id})
        if(Item){
            Item.quantity += ItemQuantity
            await Item.save()
            return res.status(200).json({message:"Quantity Incremented"})
        }else{
            return res.status(400).json({message:"Product not found in the cart"})
        }
    }catch(error){
        return next(error)
    }
}

// quantity decrement in the cart

// export const decrementItemQuantity = async(req,res,next)=>{
//     try{

//     }
// }