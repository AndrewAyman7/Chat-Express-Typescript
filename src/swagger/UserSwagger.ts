export const userSwagger = {
    tags: [
        {
            name: 'User',
            description: 'User management endpoints',
        },
    ],
    paths: {
        '/users': {
            get: {
                summary: 'Get all users',
                tags: ['User'],
                responses: {
                    200: {
                        description: 'List of users',
                    },
                    500: {
                        description: 'Internal server error',
                    },
                },
            },
        },
        '/users/{id}': {
            get: {
                summary: 'Get user by ID',
                tags: ['User'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                responses: {
                    200: {
                        description: 'User information',
                    },
                    404: {
                        description: 'User not found',
                    },
                    500: {
                        description: 'Internal server error',
                    },
                },
            },
            delete: {
                summary: 'Delete user by ID',
                tags: ['User'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                responses: {
                    204: {
                        description: 'User deleted successfully',
                    },
                    404: {
                        description: 'User not found',
                    },
                    500: {
                        description: 'Internal server error',
                    },
                },
            },
        },
    },
};