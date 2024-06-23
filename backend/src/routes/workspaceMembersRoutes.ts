import {
  addWorkspaceMember,
  removeWorkspaceMember,
} from '@/controllers/members/membersController';
import { FastifyInstance } from 'fastify';

const workspaceMembersRouters = async (server: FastifyInstance) => {
  server.post(
    '/workspaces/:id/members',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Workspace Members'],
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
    addWorkspaceMember,
  );

  server.delete(
    '/workspaces/:id/members/:member_id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Workspace Members'],
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
    removeWorkspaceMember,
  );
};

export default workspaceMembersRouters;
