
import Product from "../MODELS/productSchema.js"
import User from "../MODELS/userSchema.js"
import wishList from "../MODELS/wishListSchema.js"

// ADD WISHLIST

export const addwishList = async(req,res,next)=>{
    try{
        const userId=req.params.userId
        const productId=req.params.productId

        // finding user 

        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        // find product

        const product = await User.findById(productId)
        if(!product){
            return res.status(404).json({message:"product not found"})
        }


        let wishlistItem = await wishList.findOne({userId:user._id,productId:product._id})
        if(wishlistItem){
            return res.status(400).json({message:"product not found"})
        }else{
            wishlistItem = await wishList.create({
                userId:user._id,
                productId:product._id,
                quantity:1
            })
            user.wishList.push(wishlistItem._id)
            await user.save()
            return res.status(200).json({message:"product added to wishlist successfully"})

        }

    }catch(error){
        return next(error)
    }
}

// view user wishList

export const viewWishList = async (req,res,next)=>{
    try{
        const userid = req.params.userid
        if(!userid){
            return res.status(400).json({message:"not get the userid"})
        }
        
        const user = await User.findById(userid).populate({
            path:"wishList",
            populate:{path:'productId'}
        })

        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        if(user.isDeleted == true){
            return res.status(400).json({message:"Your account is suspended"})
        }
        if(!user.wishList || user.wishList.length === 0){
            return res.status(200).json({message:"wishList is empty"})
        }
        return res.status(200).json(user.wishList)
    }catch(error){
        return next(error)
    }

}

// remove wishlist items

export const removeWishlist = async (req,res,next)=>{
    try{
        const userid = req.pa1rams.userid
        const productid = req.params.productid

        const user =await User.findById(userid);
        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        const product = await Product.findById(productid)
        if(!product){
            return res.status(404).json({message:"product not found"})
        }
        const updateWishList = await wishList.findOneAndDelete({userId:user._id,productId:product._id})
        if(!updateWishList){
            return res.status(404).json({message:"product not found in the wishlist"})
        }

        const wishlistItemIndex = await user.wishlist.findIndex(item=>item.equals(updateWishList._id))

        if(wishlistItemIndex !== -1){
            user.wishList.splice(wishlistItemIndex,1)
            await user.save()
        }
        return res.status(200).json({message:"Product removed successfully"})
    }catch(error){
        return next(error)
    }
}