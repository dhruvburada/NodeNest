import { errorResponse } from "./responseFormatter.js";

const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    const message =
      error.message && error.message.trim() !== ""
        ? error.message
        : "Something went wrong";

    const status = error.status || 500;
    return errorResponse(res, message, status);
  }
};

export default asyncHandler;
