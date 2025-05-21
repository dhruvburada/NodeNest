import dotenv from "dotenv";
import connectDB from "./db/config.js";
import app from "./app.js";

dotenv.config();


connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server is running on PORT: ", process.env.PORT);
  });
}).catch((err)=>{
    console.error("Database Connection failed",err);
});


