import {
  AllEstimativesController,
  getEstimativeByName,
} from '@/controllers/estimatives/estimativesController';
import { FastifyInstance } from '@/types';

const estimativesRoutes = async (app: FastifyInstance) => {
  app.get(
    '/estimatives',
    {
      preValidation: [app.authenticate],
      schema: {
        tags: ['Estimatives'],
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'Resposta de sucesso',
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
                    },
                    name: { type: 'string' },
                    points: { type: 'array', items: { type: 'string' } },
                  },
                },
              },
            },
            examples: [
              {
                data: [
                  {
                    id: '37ab75d1-dc62-49a1-ba6c-ab71f2b2e995',
                    name: 'exponential',
                    points: ['1', '2', '4', '8', '16'],
                  },
                  {
                    id: '1cdda8ea-eaa5-4cae-9113-bb7178b830c1',
                    name: 'fibonacci',
                    points: ['1', '2', '3', '5', '8'],
                  },
                  {
                    id: 'a104dfe8-1277-4b44-8b4e-c12769c98861',
                    name: 'linear',
                    points: ['1', '2', '3', '4', '5'],
                  },
                  {
                    id: '895156ff-ea99-4de2-bc40-eb99d013b09b',
                    name: 't-shirt',
                    points: ['XS', 'S', 'M', 'L', 'XL'],
                  },
                ],
              },
            ],
          },
        },
      },
    },
    AllEstimativesController,
  );

  app.get(
    '/estimatives/:name',
    {
      preValidation: [app.authenticate],
      schema: {
        tags: ['Estimatives'],
        params: {
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
          required: ['name'],
        },
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'Created successfully',
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    format: 'uuid',
                  },
                  name: { type: 'string' },
                  points: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
              },
            },
            examples: [
              {
                data: {
                  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                  name: 'exponential',
                  points: ['1', '2', '4', '8', '16'],
                },
              },
            ],
          },
        },
      },
    },
    getEstimativeByName,
  );
};

export default estimativesRoutes;
