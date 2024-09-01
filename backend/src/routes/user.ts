import {
  createUserController,
  getAllUsers,
  selectUserController,
  updateUser,
} from '@/controllers/user/user';
import { FastifyInstance } from 'fastify';

const userRoutes = async (server: FastifyInstance) => {
  server.get(
    '/users',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'List of users',
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
                  },
                ],
              },
            },
          },
        },
      },
    },
    getAllUsers,
  );

  server.get(
    '/users/:id',
    {
      preValidation: [server.authenticate],
    },
    selectUserController,
  );

  server.post(
    '/users',
    {
      schema: {
        tags: ['Users'],
        body: {
          type: 'object',
          properties: {
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            username: { type: 'string' },
            password: { type: 'string', format: 'password' },
            position: { type: 'string' },
          },
          required: [
            'first_name',
            'last_name',
            'email',
            'username',
            'password',
          ],
          examples: [
            {
              first_name: 'Admin',
              last_name: 'Dev',
              email: 'admindev@gmail.com',
              username: 'admindevv',
              password: 'password',
              position: 'Frontend Developer',
            },
          ],
        },
        response: {
          201: {
            description: 'User created successfully',
            type: 'object',
            properties: {
              data: {
                id: { type: 'string', format: 'uuid' },
                first_name: { type: 'string' },
                last_name: { type: 'string' },
                full_name: { type: 'string' },
                email: { type: 'string', format: 'email' },
                username: { type: 'string' },
                position: { type: 'string' },
                created_at: { type: 'string' },
                language: { type: ['string', 'null'] },
              },
            },
            examples: [
              {
                data: {
                  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                  first_name: 'Admin',
                  last_name: 'Dev',
                  email: 'admindev@gmail.com',
                  username: 'admindev',
                  password: 'password',
                  position: 'Frontend Developer',
                  language: 'null',
                },
              },
            ],
          },
        },
      },
    },
    createUserController,
  );

  server.patch(
    '/user/:id',
    { preValidation: [server.authenticate] },
    updateUser,
  );
};

export default userRoutes;
