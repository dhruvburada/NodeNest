import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async() =>{
    try {
       
       const connection =  await mongoose.connect(`${process.env.DB}/${DB_NAME}`);
       console.log("Connection done successfully host: ",connection.connection.host)

    }
    catch(err)
    {
        console.error("Failed to connect database:",err);
    }
}

export default connectDB;