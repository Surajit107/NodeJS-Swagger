import { STATUS_CODES } from "./statusCodes.js";

export const DB_NAME = "backend_ts";
export const EXPRESS_CONFIG_LIMIT = "10mb";
export const CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
};
export const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    optionsSuccessStatus: STATUS_CODES.NO_CONTENT
};