import {
  createTeamController,
  editTeamController,
  getAllTeamsByWorkspace,
  getTeamById,
} from '@/controllers/team/team';
import { FastifyInstance } from 'fastify';

const teamRoutes = async (server: FastifyInstance) => {
  server.get(
    '/teams/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Teams'],
        summary: 'Get Team by ID',
        description: 'Retrieve the details of a team by its unique identifier.',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique team identifier',
            },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Team retrieved successfully',
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              name: { type: 'string' },
              identifier: { type: 'string' },
            },
            examples: [
              {
                id: 'c0c5f47b-7769-4c69-8191-8acb9dfb931d',
                name: 'Development Team',
                identifier: 'DEV',
              },
            ],
          },

          404: {
            description: 'Team not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    getTeamById,
  );

  server.patch(
    '/teams/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Teams'],
        summary: 'Edit Team by ID',
        description: 'Edit the details of a team by its unique identifier.',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique team identifier',
            },
          },
          required: ['id'],
        },
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            identifier: { type: 'string' },
          },
          required: ['name', 'identifier'],
          examples: [
            {
              name: 'Updated Team Name',
              identifier: 'UPD',
            },
          ],
        },
        response: {
          200: {
            description: 'Team updated successfully',
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              name: { type: 'string' },
              identifier: { type: 'string' },
            },
            examples: [
              {
                id: 'c0c5f47b-7769-4c69-8191-8acb9dfb931d',
                name: 'Updated Team Name',
                identifier: 'UPD',
              },
            ],
          },

          400: {
            description: 'Invalid request data',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    editTeamController,
  );

  server.get(
    '/workspaces/:id/teams',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Workspace Teams'],
        summary: 'Get all Teams by Workspace',
        description: 'Retrieve all teams within a specific workspace.',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Workspace ID',
            },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Successfully retrieved all teams for the workspace',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                name: { type: 'string' },
                identifier: { type: 'string' },
              },
            },
            examples: [
              {
                id: 'c0c5f47b-7769-4c69-8191-8acb9dfb931d',
                name: 'Development Team',
                identifier: 'DEV',
              },
              {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                name: 'Design Team',
                identifier: 'DES',
              },
            ],
          },

          404: {
            description: 'Workspace not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    getAllTeamsByWorkspace,
  );

  server.post(
    '/workspaces/:id/teams',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Workspace Teams'],
        summary: 'Create a new Team in a Workspace',
        description: 'Create a new team within a specific workspace.',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Workspace ID',
            },
          },
          required: ['id'],
        },
        body: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Name of the team' },
            identifier: {
              type: 'string',
              description: 'Unique team identifier',
            },
          },
          required: ['name', 'identifier'],
          examples: [
            {
              name: 'Marketing Team',
              identifier: 'MKT',
            },
          ],
        },
        response: {
          201: {
            description: 'Team created successfully',
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              name: { type: 'string' },
              identifier: { type: 'string' },
            },
            examples: [
              {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                name: 'Marketing Team',
                identifier: 'MKT',
              },
            ],
          },

          400: {
            description: 'Invalid request data',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    createTeamController,
  );
};

export default teamRoutes;
