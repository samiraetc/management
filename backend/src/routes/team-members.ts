import {
  removeTeamMember,
  addTeamMember,
} from '@/controllers/team/team-members';
import { FastifyInstance } from 'fastify';

const TeamMembersRoutes = async (server: FastifyInstance) => {
  server.post(
    '/teams/:id/members',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Teams Members'],
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
            description: 'Members added successfully',
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
    addTeamMember,
  );

  server.delete(
    '/teams/:id/members/:member_id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Teams Members'],
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            member_id: { type: 'string' },
          },
          required: ['id', 'member_id'],
        },
        response: {
          200: {
            description: 'Member removed successfully',
            type: 'object',
            properties: {
              id: { type: 'string' },
              member_id: { type: 'string' },
            },
          },
        },
      },
    },
    removeTeamMember,
  );
};

export default TeamMembersRoutes;
