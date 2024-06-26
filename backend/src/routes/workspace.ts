import {
  createWorkspaceController,
  deleteWorkspace,
  getAllWorkspaces,
  getWorkspace,
} from '@/controllers/workspace/workspace';
import { FastifyInstance } from 'fastify';

const workspaceRouters = async (server: FastifyInstance) => {
  server.get(
    '/workspaces',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Workspace'],
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'List of workspaces',
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    created_at: { type: 'string' },
                    updated_at: { type: 'string' },
                    creator_id: { type: 'string' },
                    url_key: { type: 'string' },
                    creator: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        first_name: { type: 'string' },
                        last_name: { type: 'string' },
                        full_name: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        username: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    getAllWorkspaces,
  );

  server.get(
    '/workspaces/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Workspace'],
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'Workspace details',
            type: 'object',
            properties: {
              data: {
                id: { type: 'string' },
                name: { type: 'string' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' },
                creator_id: { type: 'string' },
                url_key: { type: 'string' },
                creator: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    first_name: { type: 'string' },
                    last_name: { type: 'string' },
                    full_name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    username: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    getWorkspace,
  );

  server.post(
    '/workspaces',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Workspace'],
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            url_key: { type: 'string' },
          },
          examples: [
            {
              name: 'workspace',
              url_key: 'url_workspace',
            },
          ],
          required: ['name', 'url_key'],
        },
        response: {
          201: {
            description: 'Workspace details',
            type: 'object',
            properties: {
              data: {
                id: { type: 'string' },
                name: { type: 'string' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' },
                creator_id: { type: 'string' },
                url_key: { type: 'string' },
                creator: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    first_name: { type: 'string' },
                    last_name: { type: 'string' },
                    full_name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    username: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    createWorkspaceController,
  );

  server.delete(
    '/workspaces/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Workspace'],
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'Workspace details',
            type: 'object',
            properties: {
              data: {
                message: { type: 'string' },
              },
            },
          },
        },
      },
    },
    deleteWorkspace,
  );
};

export default workspaceRouters;
