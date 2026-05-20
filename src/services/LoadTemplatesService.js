import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.js';

// Loads an email template asynchronously, replacing placeholders with provided values.
export const loadTemplate = async (templateFilename, values) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        // Resolve absolute path to the templates folder
        const templatesDir = path.join(__dirname, '../templates');
        const filePath = path.join(templatesDir, templateFilename);

        if (!fs.existsSync(filePath)) {
            throw new Error(RESPONSE_MESSAGES.TEMPLATE_NOT_FOUND);
        }

        // Read the HTML file asynchronously
        let template = await fs.promises.readFile(filePath, 'utf-8');

        // Replace placeholders with actual values
        Object.keys(values).forEach((key) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            template = template.replace(regex, values[key]);
        });

        return template;
    } catch (error) {
        throw new Error(`${RESPONSE_MESSAGES.TEMPLATE_READ_ERROR}: ${error.message}`);
    }
};