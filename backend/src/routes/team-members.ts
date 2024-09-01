import {
  removeTeamMember,
  addTeamMember,
  selectAllTeamMembers,
  editTeamMembers,
} from '@/controllers/team-members/team-members';
import { FastifyInstance } from 'fastify';

const teamMembersRoutes = async (server: FastifyInstance) => {
  server.get(
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
    selectAllTeamMembers,
  );

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
            email: {
              type: 'string',
            },
          },
          required: ['email'],
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

  server.patch(
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
        body: {
          type: 'object',
          properties: {
            permission: {
              type: 'string',
            },
          },
          required: ['permission'],
        },
        response: {
          200: {
            description: 'Members added successfully',
            type: 'object',
            properties: {
              id: { type: 'string' },
              member_id: { type: 'string' },
            },
          },
        },
      },
    },
    editTeamMembers,
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

export default teamMembersRoutes;
