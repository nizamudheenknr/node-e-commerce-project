import productJoi from "../VALIDATION/productsValidation.js";
import Product from "../MODELS/productSchema.js";

// PRODUCT CREATE

export const createProduct = async (req, res, next) => {
  try {
    const {value,error} = productJoi.validate(req.body);
    // const  value  = req.body;
    // const {title,description,price,category} = req.body;
    if (error) {
      res.status(404).json({ error: error });
    }
    // console.log(value.title);

    const newProduct = new Product({
      title: value.title,
      description: value.description,
      price: value.price,
      productImage: req.cloudinaryImageUrl,
      category: value.category,
    });

    await newProduct.save();

    res.status(200).json({ message: "product added successfully" });
  } catch (error) {
    return next(error);
  }
};




// VIEW ALL PRODUCTS

// export const viewAllProduct= async(req,res,next)=>{
//     try{
//         const products = await Product.find()

//         if(!products){
//             res.status(404).json({message:"products not found"})
//         }
//         res.status(200).json({message:"Products fetched succussfuully",data:products})
//     }catch(error){
//         return next(error)
//     }
// }

// // VIEW SPECIFIC PRODUCT BY ID

// export const specificProduct=async(req,res,next)=>{
//     try{
//         const id =req.params.id;

//         if(!id){
//             res.status(404).json({message:"ID not found"})
//         }
         
//          const product = await Product.findById(id)
//          if(!product){
//             res.status(404).json({message:"Product not found"})
//          }
//          res.status(200).json({message:"Product fetched succussfully",data:product})

//     }catch(error){
//        return  next(error)
//     }
// }

// // VIEW THE PRODUCT BT CATEGORY


// export const viewCategory = async(req,res,next)=>{
//   try{
//     const name = req.params.category

//     const product = await Product.find({ $or:[
//       {title:{$regex:new RegExp(name,"i")}},
//       {category:{$regex:new RegExp(name,"i")}}
//     ]

//     })
//     if(product.length ==0){
//       res.status(404).json({message:"product not found"})
//     }
//      res.status(200).json({message:"Categories fetched succussfully"})

//   }catch(error){
//     return next(error)
//   }
// }