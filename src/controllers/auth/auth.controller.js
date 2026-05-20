import jwt from "jsonwebtoken";
import UserModel from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/ApiResponseHaldler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { generateAccessAndRefreshToken, generateVerificationToken } from "../../services/TokenService.js";
import { sendEmail } from "../../services/EmailService.js";
import { CookieOptions } from "../../constants/index.js";
import { STATUS_CODES } from "../../constants/statusCodes.js";
import { RESPONSE_MESSAGES } from "../../constants/responseMessages.js";
import { loadTemplate } from "../../services/LoadTemplatesService.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


const isEmailRegistered = async (email) => {
    return await UserModel.findOne({ email });
};

// Register User
export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return sendErrorResponse(res, new ApiError(STATUS_CODES.BAD_REQUEST, "All required fields must be provided"));
  }

  if (await isEmailRegistered(email)) {
    return sendErrorResponse(res, new ApiError(STATUS_CODES.CONFLICT, RESPONSE_MESSAGES.EMAIL_ALREADY_EXISTS));
  }

  const newUser = await UserModel.create({
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email,
    password,
    isVerified: false,
    avatar: "",
  });

  const verificationToken = generateVerificationToken(newUser._id);
  const verificationUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}/verify-email?token=${verificationToken}`;

  const emailContent = await loadTemplate("verificationEmail.html", {
    fullName: newUser.fullName,
    verificationUrl
  });

  const emailResponse = await sendEmail({
    receiver: newUser.email,
    subject: "Email Verification",
    htmlContent: emailContent
  });

  if (!emailResponse.success) {
    return sendErrorResponse(res, new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, emailResponse.message));
  }

  return sendSuccessResponse(res, STATUS_CODES.CREATED, {}, RESPONSE_MESSAGES.EMAIL_VERIFICATION);
});

// Verify Email
export const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);
        const user = await UserModel.findByIdAndUpdate(decoded.id, { isVerified: true });

        if (!user) {
            return sendErrorResponse(res, new ApiError(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.EMAIL_VERIFICATION_FAILED));
        }

        return res.status(STATUS_CODES.SUCCESS).json(new ApiResponse(200, {}, RESPONSE_MESSAGES.EMAIL_VERIFIED_SUCCESS));
    } catch (err) {
        return sendErrorResponse(res, new ApiError(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.EMAIL_VERIFICATION_FAILED));
    }
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await isEmailRegistered(email);

    if (!user || !(await user.isPasswordCorrect(password))) {
        return sendErrorResponse(res, new ApiError(STATUS_CODES.FORBIDDEN, RESPONSE_MESSAGES.INVALID_CREDENTIALS));
    }

    if (!user.isVerified) {
        return sendErrorResponse(res, new ApiError(STATUS_CODES.FORBIDDEN, RESPONSE_MESSAGES.ACCOUNT_NOT_VERIFIED));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(res, user._id);

    user.refreshToken = refreshToken;
    await user.save();

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    return res.status(STATUS_CODES.SUCCESS)
        .cookie("accessToken", accessToken, CookieOptions)
        .cookie("refreshToken", refreshToken, CookieOptions)
        .json(new ApiResponse(STATUS_CODES.SUCCESS, { user: userObj, accessToken, refreshToken }, RESPONSE_MESSAGES.LOGIN_SUCCESS));
});

// Logout User
export const logoutUser = asyncHandler(async (req, res) => {
    if (!req.user?._id) {
        return sendErrorResponse(res, new ApiError(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.USER_NOT_FOUND));
    }

    await UserModel.findByIdAndUpdate(req.user._id, { refreshToken: "" });

    return res.status(STATUS_CODES.SUCCESS)
        .clearCookie("accessToken", CookieOptions)
        .clearCookie("refreshToken", CookieOptions)
        .json(new ApiResponse(STATUS_CODES.SUCCESS, {}, RESPONSE_MESSAGES.LOGOUT_SUCCESS));
});

// Refresh Access Token
export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken || req.header("Authorization")?.replace("Bearer ", "");

    
    try {
        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await UserModel.findById(decoded._id);

        if (!user || user.refreshToken !== incomingRefreshToken) {
            return sendErrorResponse(res, new ApiError(STATUS_CODES.UNAUTHORIZED, RESPONSE_MESSAGES.INVALID_REFRESH_TOKEN));
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(res, user._id);
        user.refreshToken = refreshToken;
        await user.save();

        return res.status(STATUS_CODES.SUCCESS)
            .cookie("accessToken", accessToken, CookieOptions)
            .cookie("refreshToken", refreshToken, CookieOptions)
            .json(new ApiResponse(STATUS_CODES.SUCCESS, { accessToken, refreshToken }, RESPONSE_MESSAGES.REFRESH_TOKEN_SUCCESS));
    } catch (err) {
        return sendErrorResponse(res, new ApiError(STATUS_CODES.UNAUTHORIZED, RESPONSE_MESSAGES.INVALID_REFRESH_TOKEN));
    }
});