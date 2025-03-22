export const authSwagger = {
    tags: [
        {
            name: 'Auth',
            description: 'Authentication endpoints',
        },
    ],
    paths: {
        '/auth/register': {
            post: {
                summary: 'Register a new user',
                tags: ['Auth'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    username: {
                                        type: 'string',
                                    },
                                    email: {
                                        type: 'string',
                                    },
                                    password: {
                                        type: 'string',
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'User registered successfully',
                    },
                    400: {
                        description: 'Bad request',
                    },
                    500: {
                        description: 'Internal server error',
                    },
                },
            },
        },
        '/auth/login': {
            post: {
                summary: 'Log in a user',
                tags: ['Auth'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: {
                                        type: 'string',
                                    },
                                    password: {
                                        type: 'string',
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'User logged in successfully',
                    },
                    400: {
                        description: 'Bad request',
                    },
                    500: {
                        description: 'Internal server error',
                    },
                },
            },
        },
    },
};