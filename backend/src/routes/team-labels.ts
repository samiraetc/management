import {
  createTeamLabel,
  updateTeamLabel,
  removeTeamLabel,
  selectAllTeamLabels,
} from '@/controllers/team-labels/team-labels';
import { FastifyInstance } from 'fastify';

const teamLabelsRoutes = async (server: FastifyInstance) => {
  server.get(
    '/teams/:id/labels',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Teams Labels'],
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Created successfully',
            type: 'array',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    format: 'uuid',
                  },
                  name: { type: 'string' },
                  color: { type: 'string' },
                  can_edit: { type: 'boolean' },
                },
              },
            },
            examples: [
              {
                data: [
                  {
                    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                    name: 'bug',
                    color: '#fff000',
                    can_edit: true,
                  },
                ],
              },
            ],
          },
        },
      },
    },
    selectAllTeamLabels,
  );

  server.post(
    '/teams/:id/labels',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Teams Labels'],
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            color: { type: 'string' },
          },
          required: ['name', 'color'],
          examples: [
            {
              name: 'bug',
              color: '#fff000',
            },
          ],
        },
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
                  color: { type: 'string' },
                  can_edit: { type: 'boolean' },
                },
              },
            },
            examples: [
              {
                data: {
                  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                  name: 'bug',
                  color: '#fff000',
                  can_edit: true,
                },
              },
            ],
          },
        },
      },
    },
    createTeamLabel,
  );

  server.patch(
    '/teams/:id/labels/:label_id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Teams Labels'],
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            label_id: { type: 'string' },
          },
          required: ['id', 'label_id'],
        },
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            color: { type: 'string' },
          },
          required: ['name', 'color'],
        },
        response: {
          200: {
            description: 'Custom label updated successfully',
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              color: { type: 'string' },
            },
          },
        },
      },
    },
    updateTeamLabel,
  );

  server.delete(
    '/teams/:id/labels/:label_id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Teams Labels'],
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            label_id: { type: 'string' },
          },
          required: ['id', 'label_id'],
        },
        response: {
          200: {
            description: 'Label removed successfully',
            type: 'object',
            properties: {
              id: { type: 'string' },
              label_id: { type: 'string' },
            },
          },
        },
      },
    },
    removeTeamLabel,
  );
};

export default teamLabelsRoutes;
