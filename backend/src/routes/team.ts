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
        security: [{ bearerAuth: [] }],
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
        security: [{ bearerAuth: [] }],
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
        security: [{ bearerAuth: [] }],
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
            name: { type: 'string' },
            identifier: { type: 'string' },
          },
          examples: [
            {
              name: 'workspace',
              identifier: 'WOR',
            },
          ],
          required: ['name', 'identifier'],
        },
      },
    },
    createTeamController,
  );
};

export default teamRoutes;
