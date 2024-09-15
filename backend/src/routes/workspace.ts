import {
  postWorkspace,
  deleteWorkspace,
  getWorkspaces,
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
        summary: 'Get all Workspaces',
        description: 'Retrieve a list of all workspaces.',
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
                    id: { type: 'string', format: 'uuid' },
                    name: { type: 'string' },
                    created_at: { type: 'string', format: 'date-time' },
                    updated_at: { type: 'string', format: 'date-time' },
                    creator_id: { type: 'string', format: 'uuid' },
                    url_key: { type: 'string' },
                    creator: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', format: 'uuid' },
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
            examples: [
              {
                data: [
                  {
                    id: '1a23bc45-de67-89fg-h12i-345jkl678mno',
                    name: 'Development Workspace',
                    created_at: '2023-08-01T12:00:00Z',
                    updated_at: '2023-09-01T12:00:00Z',
                    creator_id: '123e4567-e89b-12d3-a456-426614174000',
                    url_key: 'dev_workspace',
                    creator: {
                      id: '123e4567-e89b-12d3-a456-426614174000',
                      first_name: 'John',
                      last_name: 'Doe',
                      full_name: 'John Doe',
                      email: 'john.doe@example.com',
                      username: 'johndoe',
                    },
                  },
                ],
              },
            ],
          },
        },
      },
    },
    getWorkspaces,
  );

  server.get(
    '/workspaces/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Workspace'],
        summary: 'Get Workspace by ID',
        description: 'Retrieve details of a specific workspace by its ID.',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', description: 'Workspace ID' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Workspace details',
            type: 'object',
            properties: {
              data: {
                id: { type: 'string', format: 'uuid' },
                name: { type: 'string' },
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' },
                creator_id: { type: 'string', format: 'uuid' },
                url_key: { type: 'string' },
                creator: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    first_name: { type: 'string' },
                    last_name: { type: 'string' },
                    full_name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    username: { type: 'string' },
                  },
                },
              },
            },
            examples: [
              {
                data: {
                  id: '1a23bc45-de67-89fg-h12i-345jkl678mno',
                  name: 'Development Workspace',
                  created_at: '2023-08-01T12:00:00Z',
                  updated_at: '2023-09-01T12:00:00Z',
                  creator_id: '123e4567-e89b-12d3-a456-426614174000',
                  url_key: 'dev_workspace',
                  creator: {
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    first_name: 'John',
                    last_name: 'Doe',
                    full_name: 'John Doe',
                    email: 'john.doe@example.com',
                    username: 'johndoe',
                  },
                },
              },
            ],
          },

          404: {
            description: 'Workspace not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
            examples: [
              {
                message:
                  'Workspace with ID 1a23bc45-de67-89fg-h12i-345jkl678mno not found',
              },
            ],
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
        summary: 'Create a new Workspace',
        description:
          'Create a new workspace with the provided name and URL key.',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Workspace name' },
            url_key: {
              type: 'string',
              description: 'Unique URL key for the workspace',
            },
          },
          required: ['name', 'url_key'],
          examples: [
            {
              name: 'New Workspace',
              url_key: 'new_workspace',
            },
          ],
        },
        response: {
          201: {
            description: 'Workspace created successfully',
            type: 'object',
            properties: {
              data: {
                id: { type: 'string', format: 'uuid' },
                name: { type: 'string' },
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' },
                creator_id: { type: 'string', format: 'uuid' },
                url_key: { type: 'string' },
              },
            },
            examples: [
              {
                data: {
                  id: '2b34de56-fg78-90hi-jk12-456lmno789pq',
                  name: 'New Workspace',
                  created_at: '2023-09-01T12:00:00Z',
                  updated_at: '2023-09-01T12:00:00Z',
                  creator_id: '123e4567-e89b-12d3-a456-426614174000',
                  url_key: 'new_workspace',
                },
              },
            ],
          },
          400: {
            description: 'Invalid request data',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
            examples: [
              {
                message: 'Name and URL key are required fields',
              },
            ],
          },
        },
      },
    },
    postWorkspace,
  );

  server.delete(
    '/workspaces/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Workspace'],
        summary: 'Delete Workspace by ID',
        description: 'Delete a workspace by its ID.',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', description: 'Workspace ID' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Workspace deleted successfully',
            type: 'object',
            properties: {
              data: {
                message: { type: 'string' },
              },
            },
            examples: [
              {
                data: {
                  message: 'Workspace successfully deleted',
                },
              },
            ],
          },

          404: {
            description: 'Workspace not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
            examples: [
              {
                error:
                  'Workspace with ID 1a23bc45-de67-89fg-h12i-345jkl678mno not found',
              },
            ],
          },
        },
      },
    },
    deleteWorkspace,
  );
};

export default workspaceRouters;
