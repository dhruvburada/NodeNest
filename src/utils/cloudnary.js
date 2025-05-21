import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadCloudinary = async(localFilePath) =>
{
    if(!localFilePath){
        
        return new Error("Local file path is required");
    }
    try{
        let response = await cloudinary.uploader.upload(localFilePath,{resource_type:"auto",});
        console.log("File Upload Successfull : ", response.url);
    }
    catch(err){
        //remove corrupted file due to failed upload from local dir
        fs.unlinkSync(localFilePath);
    }
}
