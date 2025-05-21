export const createError = (statusCode, message) => {
    const error = new Error(message || "Something went wrong");
    error.status = statusCode;
    return error;
};
