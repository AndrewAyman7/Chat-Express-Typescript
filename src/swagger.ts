import { authSwagger } from './swagger/AuthSwagger';
import { mssgSwagger } from './swagger/MssgSwagger';
import { roomSwagger } from './swagger/RoomSwagger';
import { userSwagger } from './swagger/UserSwagger';

export const swaggerDocs = {
    openapi: '3.0.0',
    info: {
        title: 'Chat API Documentation',
        version: '1.0.0',
        description: 'API documentation for the chat project',
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: 'Local server',
        },
    ],
    tags: [
        ...authSwagger.tags, // ... spread operator , Thet are used to spread elements of an array or properties of an object into another array or object
        ...mssgSwagger.tags,
        ...roomSwagger.tags,
        ...userSwagger.tags,
    ],
    paths: {
        ...authSwagger.paths,
        ...mssgSwagger.paths,
        ...roomSwagger.paths,
        ...userSwagger.paths,
    },
};