import {
  createWorkspaceCustomLabel,
  patchWorkspaceCustomLabel,
  removeWorkspaceCustomLabel,
} from '@/controllers/customLabels/customLabelController';
import { FastifyInstance } from 'fastify';

const workspaceLabelsRouters = async (server: FastifyInstance) => {
  server.post(
    '/workspaces/:id/labels',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Workspace Labels'],
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
                },
              },
            },
            examples: [
              {
                data: {
                  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                  name: 'bug',
                  color: '#fff000',
                },
              },
            ],
          },
        },
      },
    },
    createWorkspaceCustomLabel,
  );

  server.patch(
    '/workspaces/:id/labels/:label_id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Workspace Labels'],
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
    patchWorkspaceCustomLabel,
  );

  server.delete(
    '/workspaces/:id/labels/:label_id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Workspace Labels'],
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
    removeWorkspaceCustomLabel,
  );
};

export default workspaceLabelsRouters;
