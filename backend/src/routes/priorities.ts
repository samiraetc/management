import {
  AllPriorityController,
  createPriorityController,
} from '@/controllers/priority/priority';
import { FastifyInstance } from '../types';


const priorityRoutes = async (app: FastifyInstance) => {
  app.get(
    '/priorities',
    {
      preValidation: [app.authenticate],
      schema: {
        tags: ['Priorities'],
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
                    id: { type: 'string' },
                    name: { type: 'string' },
                    value: { type: 'number' },
                  },
                },
              },
            },
            examples: [
              {
                data: [
                  {
                    id: 'bd23de17-f99c-4170-9189-521831851b55',
                    name: 'none',
                    value: 0,
                  },
                  {
                    id: '1c58d814-4998-42b2-97a7-88bdb05edd41',
                    name: 'low',
                    value: 4,
                  },
                  {
                    id: '895716f0-8880-4b62-bf0b-9d0bca339bf1',
                    name: 'medium',
                    value: 3,
                  },
                  {
                    id: '7f89f9e2-25e5-4ce4-b204-69b3310b4d3a',
                    name: 'high',
                    value: 4,
                  },
                ],
              },
            ],
          },
        },
      },
    },
    AllPriorityController,
  );

  app.post(
    '/priorities',
    {
      preValidation: [app.authenticate],
      schema: {
        tags: ['Priorities'],
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            value: { type: 'string' },
          },
          required: ['name', 'value'],
          examples: [
            {
              name: 'low',
              value: 4,
            },
          ],
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
                  value: { type: 'number' },
                },
              },
            },
            examples: [
              {
                data: {
                  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                  name: 'none',
                  value: 0,
                },
              },
            ],
          },
        },
      },
    },
    createPriorityController,
  );
};

export default priorityRoutes;
