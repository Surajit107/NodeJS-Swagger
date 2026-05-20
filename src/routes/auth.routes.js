import express from "express";
import { VerifyJWTToken } from "../middlewares/auth/authUser.js";
import {
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    verifyEmail
} from "../controllers/auth/auth.controller.js";

const router = express.Router();

// Public routes
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and authorization
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Verification email sent
 */
router.post("/signup", registerUser);

/**
 * @swagger
 * /auth/verify-email:
 *   get:
 *     summary: Verify email address via token
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Email verification token
 *     responses:
 *       200:
 *         description: Email verified successfully
 */
router.get("/verify-email", verifyEmail);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Login with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 */
router.post("/signin", loginUser);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Get new access token using refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Tokens refreshed
 */
router.post("/refresh-token", refreshAccessToken);

// Protected routes
router.use(VerifyJWTToken);
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout the user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post("/logout", logoutUser);



export default router;