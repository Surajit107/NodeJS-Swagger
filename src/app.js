import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// Swagger Docs
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swaggerConfig.js';

import { corsOptions, EXPRESS_CONFIG_LIMIT } from "./constants/index.js";
import { STATUS_CODES } from "./constants/statusCodes.js";
import { RESPONSE_MESSAGES } from "./constants/responseMessages.js";

// Load environment variables
import dotenv from "dotenv";
dotenv.config({ path: './.env' });

const app = express();

// Middleware Setup
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json({ limit: EXPRESS_CONFIG_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: EXPRESS_CONFIG_LIMIT }));
app.use(express.static("public"));
app.use(cookieParser());

// Custom Swagger UI options
const swaggerOptions = {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css',
    customSiteTitle: 'API Docs',
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));

// Import routes
import routes from './routes/index.route.js';

// Use centralized route registry
app.use(routes);

// Define API prefix
const API_PREFIX = `/api/${process.env.API_VERSION}`;

// Health Ping Endpoint
app.get(`${API_PREFIX}/ping`, (req, res) => {
    res.send("👋 Hi! I am the server. Happy to see you boss...");
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("❌ Internal Server Error:", err);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
        error: err.message,
    });
});

// 404 Not Found Handler
app.use((req, res) => {
    res.status(STATUS_CODES.NOT_FOUND).json({
        status: STATUS_CODES.NOT_FOUND,
        message: RESPONSE_MESSAGES.NOT_FOUND,
    });
});

export { app };