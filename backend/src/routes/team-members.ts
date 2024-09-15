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
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    first_name: { type: 'string' },
                    last_name: { type: 'string' },
                    full_name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    username: { type: 'string' },
                    position: { type: 'string' },
                    created_at: { type: 'string' },
                    language: { type: ['string', 'null'] },
                    image: { type: 'string' },
                  },
                },
                examples: [
                  {
                    id: '39c293b9-374e-41c7-b0f0-bc6502123b0c',
                    first_name: 'Admin',
                    last_name: 'Dev',
                    email: 'admindevvv@gmail.com',
                    created_at: '2024-06-22T23:19:23.464Z',
                    username: 'admindevvvv',
                    position: 'Frontend Developer',
                    language: null,
                    image: '',
                  },
                ],
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
