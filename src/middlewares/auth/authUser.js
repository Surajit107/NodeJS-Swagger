import { ApiError } from '../../utils/ApiError.js';
import { sendErrorResponse } from '../../utils/ApiResponseHaldler.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/user.model.js';
import { STATUS_CODES } from '../../constants/statusCodes.js';
import { RESPONSE_MESSAGES } from '../../constants/responseMessages.js';

// Middleware: Verify JWT Token
export const VerifyJWTToken = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.body?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return sendErrorResponse(
                res,
                new ApiError(STATUS_CODES.UNAUTHORIZED, RESPONSE_MESSAGES.UNAUTHORIZED)
            );
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await UserModel.findById(decodedToken._id).select('-password -rawPassword -oldPassword -refreshToken -fcmToken');

        if (!user) {
            return sendErrorResponse(
                res,
                new ApiError(STATUS_CODES.UNAUTHORIZED, RESPONSE_MESSAGES.UNAUTHORIZED)
            );
        }

        req.user = user;
        next();
    } catch (error) {
        return sendErrorResponse(
            res,
            new ApiError(STATUS_CODES.UNAUTHORIZED, error.message || RESPONSE_MESSAGES.UNAUTHORIZED)
        );
    }
});