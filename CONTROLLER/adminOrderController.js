import Orders from "../MODELS/orderSchema.js"


export const adminOrders = async(req,res,next)=>{
    try{
        const orders = await Orders.find()
        // console.log(orders);

        if(!orders){
            return res.status(404).json({message:"No Orders, please try again later.."})
        }
        return res.status(200).json({message:"Succussfully fetched",Data:orders})
    }catch(error){
        return next(error)
    }
}

export const revenue=async(req,res,next)=>{
    try{
        const total = await Orders.aggregate([
            {
                $unwind:{
                    path:"$productId",
                    preserveNullAndEmptyArrays:true
                }
            },
            {
                $group:{
                    _id:null,
                    totalProduct:{$sum:"$totalItem"},
                    totalRevenue:{$sum:"$totalPrice"}
                }
            }
        ]);

        if(total.length >0){
            return res.status(200).json({message:"Success",Data:total[0]})
        }else{
            return res.status(200).json({message:"success",Data:{totalProduct:0,totalRevenue:0}})
        }
    }catch(error){
        return next(error)
    }
}