import { getTeamById } from '@/controllers/team/team';
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
};

export default teamRoutes;
