import mongoose from 'mongoose';
import { asyncHandler } from '../utils/asyncHandler.js';
import { STATUS_CODES } from '../constants/statusCodes.js';
import os from 'os';

export const healthcheck = asyncHandler(async (req, res) => {
    const networkInterfaces = os.networkInterfaces();
    const IPv4Addresses = Object.values(networkInterfaces)
        .flat()
        .filter((iface) => iface && iface.family === 'IPv4')
        .map((iface) => iface.address);

    const status = mongoose.connection.readyState;
    const isHealthy = status === 1;

    const response = {
        host: IPv4Addresses,
        message: isHealthy ? 'Healthy' : 'Unhealthy - MongoDB not connected',
        status: isHealthy,
        time: new Date(),
    };

    return res.status(isHealthy ? 200 : STATUS_CODES.SERVICE_UNAVAILABLE).json({ response });
});