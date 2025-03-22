export const roomSwagger = {
    tags: [
        {
            name: 'Room',
            description: 'Room management endpoints',
        },
    ],
    paths: {
        '/rooms': {
            post: {
                summary: 'Create a new room',
                tags: ['Room'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                    },
                                    type: {
                                        type: 'string',
                                    },
                                    membersIds: {
                                        type: 'array',
                                        items: {
                                            type: 'integer',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Room created successfully',
                    },
                    400: {
                        description: 'Bad request',
                    },
                    500: {
                        description: 'Internal server error',
                    },
                },
            },
            get: {
                summary: 'Get all rooms',
                tags: ['Room'],
                responses: {
                    200: {
                        description: 'List of rooms',
                    },
                    500: {
                        description: 'Internal server error',
                    },
                },
            },
        },
        '/rooms/user': {
            get: {
                summary: 'Get rooms of the authorized user',
                tags: ['Room'],
                responses: {
                    200: {
                        description: 'List of rooms',
                    },
                    404: {
                        description: 'Room not found',
                    },
                    500: {
                        description: 'Internal server error',
                    },
                },
            },
        },
        '/rooms/{id}': {
            get: {
                summary: 'Get room by ID',
                tags: ['Room'],
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
                        description: 'Room information',
                    },
                    404: {
                        description: 'Room not found',
                    },
                    500: {
                        description: 'Internal server error',
                    },
                },
            },
            delete: {
                summary: 'Delete room by ID',
                tags: ['Room'],
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
                        description: 'Room deleted successfully',
                    },
                    404: {
                        description: 'Room not found',
                    },
                    500: {
                        description: 'Internal server error',
                    },
                },
            },
        },
        '/rooms/join/{roomId}': {
            post: {
                summary: 'Join a room',
                tags: ['Room'],
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
                        description: 'User joined the room',
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
        '/rooms/leave/{roomId}': {
            delete: {
                summary: 'Leave a room',
                tags: ['Room'],
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
                        description: 'User left the room',
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