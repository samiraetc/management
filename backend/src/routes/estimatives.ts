import {
  getEstimates,
  getEstimateByName,
} from '@/controllers/estimatives/estimatives';
import { FastifyInstance } from '../types';

const estimativesRoutes = async (app: FastifyInstance) => {
  app.get(
    '/estimate',
    {
      preValidation: [app.authenticate],
      schema: {
        tags: ['Estimate'],
        security: [{ bearerAuth: [] }],
        summary: 'Retrieve a list of estimates',
        description: 'Fetches all available estimates with their details',
        response: {
          200: {
            description: 'List of estimates',
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
                      description: 'Unique identifier for the estimate',
                    },
                    name: {
                      type: 'string',
                      description: 'Name of the estimate',
                    },
                    points: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                      description: 'Points associated with the estimate',
                    },
                  },
                },
                examples: [
                  {
                    id: '37ab75d1-dc62-49a1-ba6c-ab71f2b2e995',
                    name: 'estimate',
                    points: ['1', '2', '4', '8', '16'],
                  },
                ],
              },
            },
          },
        },
      },
    },
    getEstimates,
  );

  app.get(
    '/estimate/:name',
    {
      preValidation: [app.authenticate],
      schema: {
        tags: ['Estimate'],
        summary: 'Retrieve an estimate by its name',
        description: 'Fetches a single estimate based on its name',
        params: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the estimate to fetch',
            },
          },
          required: ['name'],
        },
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'Details of the estimate',
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Unique identifier for the estimate',
                  },
                  name: {
                    type: 'string',
                    description: 'Name of the estimate',
                  },
                  points: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    description: 'Points associated with the estimate',
                  },
                },
                examples: [
                  {
                    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                    name: 'exponential',
                    points: ['1', '2', '4', '8', '16'],
                  },
                ],
              },
            },
          },
          404: {
            description: 'Estimate not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    getEstimateByName,
  );
};

export default estimativesRoutes;
