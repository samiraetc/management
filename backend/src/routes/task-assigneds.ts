import {
  addTaskAssigned,
  removeTaskAssigned,
  selectAllTaskAssigned,
} from '@/controllers/task-assigned/task-assigned';
import { FastifyInstance } from 'fastify';

const taskAssignedsRoutes = async (server: FastifyInstance) => {
  server.get(
    '/task/:id/assigneds',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Task Assigned'],
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
            description: 'Assigned added successfully',
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
    selectAllTaskAssigned,
  );

  server.post(
    '/task/:id/assigned',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Task Assigned'],
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
            user_ids: {
              type: 'array',
              items: { type: 'string' },
            },
          },
          required: ['user_ids'],
        },
        response: {
          200: {
            description: 'Assigned added successfully',
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
    addTaskAssigned,
  );

  server.delete(
    '/task/:id/assigneds/:user_id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Task Assigned'],
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            user_id: { type: 'string' },
          },
          required: ['id', 'user_id'],
        },
        response: {
          200: {
            description: 'Member removed successfully',
            type: 'object',
            properties: {
              id: { type: 'string' },
              user_id: { type: 'string' },
            },
          },
        },
      },
    },
    removeTaskAssigned,
  );
};

export default taskAssignedsRoutes;
