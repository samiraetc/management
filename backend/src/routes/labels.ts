import { getAllLabels, postLabel } from '@/controllers/labels/label';
import { FastifyInstance } from '../types';

const labelRoutes = async (app: FastifyInstance) => {
  app.get(
    '/labels',
    {
      preValidation: [app.authenticate],
      schema: {
        tags: ['Labels'],
        security: [{ bearerAuth: [] }],
        summary: 'Retrieve all labels',
        description: 'Fetches all available labels with their details.',
        response: {
          200: {
            description: 'Successfully retrieved all labels',
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
                      description: 'Unique identifier for the label',
                    },
                    name: {
                      type: 'string',
                      description: 'Name of the label',
                    },
                    color: {
                      type: 'string',
                      description: 'Color associated with the label',
                    },
                  },
                  required: ['id', 'name', 'color'],
                },
                examples: [
                  {
                    id: 'bd23de17-f99c-4170-9189-521831851b55',
                    name: 'bug',
                    color: '#eb5757',
                  },
                  {
                    id: '1c58d814-4998-42b2-97a7-88bdb05edd41',
                    name: 'feature',
                    color: '#BB87FC',
                  },
                  {
                    id: '895716f0-8880-4b62-bf0b-9d0bca339bf1',
                    name: 'improvement',
                    color: '#4EA7FC',
                  },
                  {
                    id: '7f89f9e2-25e5-4ce4-b204-69b3310b4d3a',
                    name: 'canceled',
                    color: '#4EA7FC',
                  },
                ],
              },
            },
          },
          401: {
            description: 'Unauthorized',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    getAllLabels,
  );

  app.post(
    '/labels',
    {
      preValidation: [app.authenticate],
      schema: {
        tags: ['Labels'],
        summary: 'Create a new label',
        description: 'Creates a new label with the provided name and color.',
        body: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the new label',
            },
            color: {
              type: 'string',
              description: 'Color associated with the new label',
            },
          },
          required: ['name', 'color'],
          examples: [
            {
              name: 'bug',
              color: '#fff000',
            },
          ],
        },
        security: [{ bearerAuth: [] }],
        response: {
          201: {
            description: 'Label created successfully',
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    format: 'uuid',
                    description:
                      'Unique identifier for the newly created label',
                  },
                  name: {
                    type: 'string',
                    description: 'Name of the newly created label',
                  },
                  color: {
                    type: 'string',
                    description:
                      'Color associated with the newly created label',
                  },
                },
                required: ['id', 'name', 'color'],
                examples: [
                  {
                    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                    name: 'bug',
                    color: '#fff000',
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
    postLabel,
  );
};

export default labelRoutes;
