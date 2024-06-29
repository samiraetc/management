import {
  addWorkspaceMember,
  editWorkspaceMember,
  removeWorkspaceMember,
  selectWorkspaceMembers,
} from '@/controllers/workspace-members/workspace-members';
import { FastifyInstance } from 'fastify';

const workspaceMembersRouters = async (server: FastifyInstance) => {
  server.get(
    '/workspace/:id/members',
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
        response: {
          200: {
            description: 'Member removed successfully',
            type: 'array',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  member_id: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    selectWorkspaceMembers,
  );

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

  server.patch(
    '/workspace/:id/members/:member_id',
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
    editWorkspaceMember,
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
