// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Backend API Docs',
        version: '1.0.0',
        description: 'API documentation for the backend server with MongoDB and Express.js',
        contact: {
            name: 'Your Name',
            email: 'your.email@example.com',
        },
    },
    servers: [
        {
            url: `${process.env.SERVER_HOST}/api/${process.env.API_VERSION}`,
            description: 'Development server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['src/routes/**/*.js'], // 🔄 ✅ Scan all route files including nested ones
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;