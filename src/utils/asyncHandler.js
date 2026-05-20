import { RESPONSE_MESSAGES } from '../constants/responseMessages.js';
import { STATUS_CODES } from '../constants/statusCodes.js';
import { ApiError } from './ApiError.js';
import { sendErrorResponse } from './ApiResponseHaldler.js';

const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            console.error("🔥 Async Error:", error);

            // Convert non-ApiError into ApiError for consistency
            if (!(error instanceof ApiError)) {
                error = new ApiError(
                    error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
                    error.message || RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
                    error.errors || [],
                    error.stack
                );
            }

            sendErrorResponse(res, error);
        }
    };
};

export { asyncHandler };