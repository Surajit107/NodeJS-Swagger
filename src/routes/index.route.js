import express from 'express';
import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const router = express.Router();
const API_PREFIX = `/api/${process.env.API_VERSION}`;

// Emulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read all *.routes.js files
const routeFiles = readdirSync(__dirname)
    .filter(file => file.endsWith('.routes.js') && file !== 'index.js');

for (const file of routeFiles) {
    const absolutePath = path.join(__dirname, file);
    const fileUrl = pathToFileURL(absolutePath).href;

    const route = await import(fileUrl); // ✅ this works on Windows
    const baseRoute = file.replace('.routes.js', '').toLowerCase();

    router.use(`${API_PREFIX}/${baseRoute}`, route.default);
}

export default router;