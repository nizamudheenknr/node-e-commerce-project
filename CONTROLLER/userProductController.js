
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
        const productid = req.params.id

        if(!productid){
            res.status(400).json({message:"ID not found"})
        }

        const product = await Product.findById(productid)

        if(!product){
           res.status(404).json({message:"Product not found"})
        }
           res.status(200).json({message:"fecthed product succussfully",data:product})
    }catch(error){
        return next(error)
    }
}

// VIEW PRODUCT BY CATEGORY

export const productCategory = async (req,res,next)=>{
    try{
        const category = req.params.category

        if(!category){
          return res.status(404).json({message:"category not found"})
        }

        const categories = await Product.find({
            $or:[
                {title:{$regex:new RegExp(category,"i")}},
                {category:{$regex:new RegExp(category,"i")}}
            ]
        })
        if(categories.length==0){
           return res.status(404).json({message:"products not found"})
        }
       return res.status(200).json({message:"categories fecthed successfully",data:categories})
    }catch(error){
        return next(error)
    }
}