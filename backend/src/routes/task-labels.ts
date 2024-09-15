import {
  addTaskLabel,
  removeTaskLabel,
  selectAllTaskLabel,
} from '@/controllers/task-labels/task-labels';
import { FastifyInstance } from 'fastify';

const taskLabelsRoutes = async (server: FastifyInstance) => {
  server.get(
    '/task/:id/labels',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Task Labels'],
        summary: 'Get all labels for a task',
        description:
          'Retrieve all labels associated with a specific task by task ID.',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the task',
            },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Successfully retrieved task labels',
            type: 'object',
            properties: {
              label_ids: {
                type: 'array',
                items: { type: 'string', format: 'uuid' },
                description: 'List of label IDs associated with the task',
              },
            },
            examples: [
              {
                label_ids: ['abc123', 'def456', 'ghi789'],
              },
            ],
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
        summary: 'Add labels to a task',
        description: 'Associate one or more labels to a task using task ID.',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the task',
            },
          },
          required: ['id'],
        },
        body: {
          type: 'object',
          properties: {
            label_ids: {
              type: 'array',
              items: { type: 'string', format: 'uuid' },
              description: 'List of label IDs to associate with the task',
            },
          },
          required: ['label_ids'],
          examples: [
            {
              label_ids: ['abc123', 'def456'],
            },
          ],
        },
        response: {
          200: {
            description: 'Labels added to the task successfully',
            type: 'object',
            properties: {
              label_ids: {
                type: 'array',
                items: { type: 'string', format: 'uuid' },
                description: 'List of label IDs added to the task',
              },
            },
            examples: [
              {
                label_ids: ['abc123', 'def456'],
              },
            ],
          },
        },
      },
    },
    addTaskLabel,
  );

  // DELETE: Remove a label from a task
  server.delete(
    '/task/:id/labels/:label_id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Task Labels'],
        summary: 'Remove a label from a task',
        description:
          'Remove a specific label from a task by task ID and label ID.',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the task',
            },
            label_id: {
              type: 'string',
              description: 'Unique identifier for the label to be removed',
            },
          },
          required: ['id', 'label_id'],
        },
        response: {
          200: {
            description: 'Label removed from the task successfully',
            type: 'object',
            properties: {
              id: {
                type: 'string',
                format: 'uuid',
                description: 'ID of the task',
              },
              label_id: {
                type: 'string',
                format: 'uuid',
                description: 'ID of the removed label',
              },
            },
            examples: [
              {
                id: 'task123',
                label_id: 'label123',
              },
            ],
          },
        },
      },
    },
    removeTaskLabel,
  );
};

export default taskLabelsRoutes;
