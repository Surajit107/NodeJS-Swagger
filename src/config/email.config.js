import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587", 10),
    secure: false, // Use TLS
    requireTLS: true,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.APP_PASSWORD,
    },
});