import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

//To allow request from another device
app.use(cors({ origin: process.env.CORS_ORIGIN,credentials:true }));

//accepting json data from body
app.use(express.json({limit:"16kb"}));

//accepting data from url
app.use(express.urlencoded({extended:true,limit:"16kb"}));

//declare directory from where we will serve the static files
app.use(express.static("public"));

//do CRUD operations in Users Cookies
app.use(cookieParser())


//use router
import allRoutes from "./routes/index.route.js"
app.use("/api/v1/",allRoutes);


export default app;