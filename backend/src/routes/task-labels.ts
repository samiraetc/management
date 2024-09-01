import { addTaskLabel, removeTaskLabel, selectAllTaskLabel } from '@/controllers/task-labels/task-labels';
import { FastifyInstance } from 'fastify';

const taskLabelsRoutes = async (server: FastifyInstance) => {
  server.get(
    '/task/:id/labels',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Task Labels'],
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
            description: 'Labels added successfully',
            type: 'object',
            properties: {
              user_ids: {
                type: 'array',
                items: { type: 'string' },
              },
            },
          },
        },
      },
    },
    selectAllTaskLabel,
  );

  server.post(
    '/task/:id/labels',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Task Labels'],
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        body: {
          type: 'object',
          properties: {
            label_ids: {
              type: 'array',
              items: { type: 'string' },
            },
          },
          required: ['label_ids'],
        },
        response: {
          200: {
            description: 'Assigned added successfully',
            type: 'object',
            properties: {
              label_ids: {
                type: 'array',
                items: { type: 'string' },
              },
            },
          },
        },
      },
    },
    addTaskLabel,
  );

  server.delete(
    '/task/:id/labels/:label_id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Task Labels'],
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
            description: 'Member removed successfully',
            type: 'object',
            properties: {
              id: { type: 'string' },
              label_id: { type: 'string' },
            },
          },
        },
      },
    },
    removeTaskLabel,
  );
};

export default taskLabelsRoutes;
