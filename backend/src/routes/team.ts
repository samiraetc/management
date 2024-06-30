import { getAllTeamsByWorkspace, getTeamById } from '@/controllers/team/team';
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
};

export default teamRoutes;
