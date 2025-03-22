export const mssgSwagger = {
    tags: [
        {
            name: 'Message',
            description: 'Message management endpoints',
        },
    ],
    paths: {
        '/messages': {
            post: {
                summary: 'Create a new message',
                tags: ['Message'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    content: {
                                        type: 'string',
                                    },
                                },
                            },
                        },
                    },
                },
                parameters: [
                    {
                        name: 'roomId',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                responses: {
                    201: {
                        description: 'Message created successfully',
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
        '/messages/room/{roomId}': {
            get: {
                summary: 'Get messages by room ID',
                tags: ['Message'],
                parameters: [
                    {
                        name: 'roomId',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                responses: {
                    200: {
                        description: 'List of messages',
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
        '/messages/user/{userId}': {
            get: {
                summary: 'Get messages by user ID',
                tags: ['Message'],
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                responses: {
                    200: {
                        description: 'List of messages',
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
        '/messages/user': {
            get: {
                summary: 'Get messages of the authorized user',
                tags: ['Message'],
                responses: {
                    200: {
                        description: 'List of messages',
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