// Load environment variables
import dotenv from "dotenv";
dotenv.config({ path: './.env' });
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { RESPONSE_MESSAGES } from "../constants/responseMessages.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import UserModel from "../models/user.model.js";

// Generate Access + Refresh Token and store refreshToken in DB
export const generateAccessAndRefreshToken = async (res, userId) => {
    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            throw new ApiError(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.USER_NOT_FOUND);
        }

        // These methods are defined on the Mongoose schema
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Save refreshToken to DB
        user.refreshToken = refreshToken;
        await user.save();

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, error.message);
    }
};

// Generate Email Verification Token
export const generateVerificationToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.EMAIL_VERIFICATION_SECRET,
        { expiresIn: process.env.EMAIL_VERIFICATION_TIME }
    );
};