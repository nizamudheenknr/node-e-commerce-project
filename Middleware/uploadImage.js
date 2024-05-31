import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv"
import multer from 'multer';
dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.Cloud_name, 
  api_key: process.env.API_key, 
  api_secret: process.env.API_secret
});

const storage = multer.diskStorage({

})

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // set the file size as 4 mb
    }
})

const uploadImage = (req,res,next)=>{
    upload.single('image')(req,res,async error =>{
        try{
            if(req.file){
                const uploadResult = await cloudinary.uploader.upload(req.file.path);
                req.cloudinaryImageUrl = uploadResult.secure_url
            }
            next()
        }catch (error){
            return next(error)
        }
    })
}
export default uploadImage;