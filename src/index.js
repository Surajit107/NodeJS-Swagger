import dotenv from "dotenv";
dotenv.config({ path: './.env' });

import connectDB from "./db/dbConfig.js";
import http from 'http';
import { app } from "./app.js";

const server = http.createServer(app);

connectDB().then(() => {
    server.on("error", (error) => {
        console.log(`❌ Server Connection Error: ${error}`);
    });

    const PORT = process.env.PORT || 8700;
    const SERVER_HOST = process.env.SERVER_HOST || `http://localhost:${PORT}`;
    const API_VERSION = process.env.API_VERSION || 'v1';

    server.listen(PORT, () => {
        console.log(`\n✅ Server Status: RUNNING`);
        console.log(`🛠️  Listening on Port: ${PORT}`);
        console.log(`📡 API Check: ${SERVER_HOST}/api/${API_VERSION}/ping\n`);
        // console.log(`🌐 API Base URL: ${SERVER_HOST}/api/${API_VERSION}`);
        // console.log(`🩺 Health Check ▶️ GET ${SERVER_HOST}/api/${API_VERSION}/healthcheck\n`);
    });
}).catch((err) => {
    console.log("❌ MongoDB Connection Failed!!", err);
});