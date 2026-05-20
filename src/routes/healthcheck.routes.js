import express from 'express';
import { healthcheck } from "../controllers/healthcheck.controller.js";

const router = express.Router();

/**
 * @swagger
 * /healthcheck:
 *   get:
 *     summary: Check server and database health
 *     tags: [Healthcheck]
 *     responses:
 *       200:
 *         description: Server and MongoDB are healthy
 */
router.route('/').get(healthcheck);

export default router;