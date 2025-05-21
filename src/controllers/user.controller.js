import asyncHandler from "../utils/asyncHandler.js";
import { createError } from "../utils/createError.js";
import { successResponse } from "../utils/responseFormatter.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, username, password } = req.body;
  const fields = [name, email, username, password];
  if (fields.some((field) => !field || field.trim() === "")) {
    throw createError(400, "All fields are necessary");
  }

  return successResponse(res,null,"User registered Successfully");
});
