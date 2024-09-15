import { getPriorities, postPriority } from '@/controllers/priority/priority';
import { FastifyInstance } from '../types';

const priorityRoutes = async (app: FastifyInstance) => {
  app.get(
    '/priorities',
    {
      preValidation: [app.authenticate],
      schema: {
        tags: ['Priorities'],
        security: [{ bearerAuth: [] }],
        summary: 'Retrieve all priorities',
        description: 'Fetches all available priorities with their details.',
        response: {
          200: {
            description: 'Successfully retrieved all priorities',
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      format: 'uuid',
                      description: 'Unique identifier for the priority',
                    },
                    name: {
                      type: 'string',
                      description: 'Name of the priority',
                    },
                    value: {
                      type: 'number',
                      description: 'Value associated with the priority',
                    },
                  },
                  required: ['id', 'name', 'value'],
                },
                examples: [
                  {
                    id: 'bd23de17-f99c-4170-9189-521831851b55',
                    name: 'none',
                    value: 0,
                  },
                  {
                    id: '1c58d814-4998-42b2-97a7-88bdb05edd41',
                    name: 'low',
                    value: 1,
                  },
                  {
                    id: '895716f0-8880-4b62-bf0b-9d0bca339bf1',
                    name: 'medium',
                    value: 3,
                  },
                  {
                    id: '7f89f9e2-25e5-4ce4-b204-69b3310b4d3a',
                    name: 'high',
                    value: 5,
                  },
                ],
              },
            },
          },
          400: {
            description: 'Bad Request',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    getPriorities,
  );

  app.post(
    '/priorities',
    {
      preValidation: [app.authenticate],
      schema: {
        tags: ['Priorities'],
        summary: 'Create a new priority',
        description: 'Creates a new priority with the provided name and value.',
        body: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the new priority',
            },
            value: {
              type: 'number',
              description: 'Value associated with the new priority',
            },
          },
          required: ['name', 'value'],
          examples: [
            {
              name: 'low',
              value: 2,
            },
          ],
        },
        security: [{ bearerAuth: [] }],
        response: {
          201: {
            description: 'Priority created successfully',
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    format: 'uuid',
                    description:
                      'Unique identifier for the newly created priority',
                  },
                  name: {
                    type: 'string',
                    description: 'Name of the newly created priority',
                  },
                  value: {
                    type: 'number',
                    description:
                      'Value associated with the newly created priority',
                  },
                },
                required: ['id', 'name', 'value'],
                examples: [
                  {
                    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                    name: 'low',
                    value: 2,
                  },
                ],
              },
            },
          },
          400: {
            description: 'Bad Request',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    postPriority,
  );
};

export default priorityRoutes;
