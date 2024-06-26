import { getTeamById } from '@/controllers/team/teamController';
import { FastifyInstance } from 'fastify';

const TeamRoutes = async (server: FastifyInstance) => {
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
};

export default TeamRoutes;
