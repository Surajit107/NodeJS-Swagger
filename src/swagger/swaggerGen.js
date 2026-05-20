import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Backend API Docs',
        description: 'Auto-generated docs using swagger-autogen + Express + MongoDB',
        version: '1.0.0',
    },
    host: 'localhost:8700',
    basePath: '/api/v1',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        { name: 'Auth', description: 'User authentication and JWT flow' },
        { name: 'Healthcheck', description: 'System health status' },
    ],
};

const outputFile = './src/swagger/swagger-output.json'; // ✅ output file
const endpointsFiles = [
    './src/routes/auth.routes.js',
    './src/routes/healthcheck.routes.js',
];  // ✅ matches your file

swaggerAutogen()(outputFile, endpointsFiles, doc);