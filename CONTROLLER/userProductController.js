
import Product from "../MODELS/productSchema.js"


// VIEW ALL PRODUCT

export const viewAllProduct = async (req,res,next)=>{
 try{
    const product = await Product.find()

    if(!product){
        res.status(400).json({message:"Products not found"})
    }

    res.status(200).json({message:"Fetched product succussfully",date:product})
 }catch(error){
    return next(error)
 }
}

// VIEW A PRODUCT SPECIFIC BY ID

export const viewSpecificProduct = async(req,res,next)=>{
    try{
        const id = req.params.id

        if(!id){
            res.status(400).json({message:"ID not found"})
        }

        const product = await product.findById(id)

        if(!product){
            res.status(404).json({message:"Product not found"})
        }
           res.status(200).json({message:"fecthed product succussfully",data:product})
    }catch(error){
        return next(error)
    }
}