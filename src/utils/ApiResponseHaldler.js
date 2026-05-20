import { ApiError } from "./ApiError.js";
import { ApiResponse } from "./ApiResponse.js";

export const sendSuccessResponse = (res, statusCode, data, message = "Success", token = null) => {
    const response = new ApiResponse(statusCode, data, message, token);
    return res.status(statusCode).json(response);
};

export const sendErrorResponse = (res, error) => {
    if (!(error instanceof ApiError)) {
        error = new ApiError(
            error.statusCode || 500,
            error.message || "Unexpected Error",
            error.errors || [],
            error.stack
        );
    }

    const responsePayload = {
        statusCode: error.statusCode,
        success: false,
        message: error.message,
        errors: error.errors,
    };

    if (error.data) responsePayload.data = error.data;

    return res.status(error.statusCode).json(responsePayload);
};