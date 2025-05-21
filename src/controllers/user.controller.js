import asyncHandler from "../utils/asyncHandler.js";
import { createError } from "../utils/createError.js";
import { successResponse } from "../utils/responseFormatter.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudnary.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, username, password } = req.body;
  const fields = [name, email, username, password];
  
  //check if the fields are empty
  if (fields.some((field) => !field || field.trim() === "")) {
    throw createError(400, "All fields are necessary");
  }

  //check if email or username already exists

  const existingUser = await User.findOne({
    $or : [{email:email},{username:username}]
  })



  if(existingUser){
    throw createError(400,"User already exists");
  }


  const avatarLocalPath = req.files?.avtar?.[0]?.path
  const coverImagePath = req.files?.coverImage?.[0]?.path


  if(!avatarLocalPath)
  {
    throw createError(400,"User Avtar image is required")
  }

  console.log(avatarLocalPath)
  const avtar = await uploadCloudinary(avatarLocalPath);
 



  const coverImageUrl = coverImagePath ? await uploadCloudinary(coverImagePath) : "";

  if(!avtar)
  {
    throw createError(502,"avtar image upload failed");
  }


  const createdUser = await User.create({userName:username,email,password,fullName:name,avtar:avtar,coverImage:coverImageUrl})

  if(!createdUser)
  {
    throw createError(500,"Error occured while creating User");
  }

  return successResponse(res,createdUser,"User created Successfully");
});
