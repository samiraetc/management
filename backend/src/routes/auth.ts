import { loginController, logoutController } from '@/controllers/auth/auth';
import { FastifyInstance } from '../types';

const authRoutes = async (app: FastifyInstance) => {
  app.post(
    '/login',
    {
      schema: {
        tags: ['Login'],
        description: 'It can use email or username to login',
        body: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
            },
            username: {
              type: 'string',
            },
            password: {
              type: 'string',
              format: 'password',
            },
          },
          examples: [{ email: 'admindev@gmail.com', password: 'password' }],
          required: ['password'],
          oneOf: [{ required: ['email'] }, { required: ['username'] }],
        },

        response: {
          200: {
            description: 'Login successful',
            type: 'object',
            properties: {
              token: {
                type: 'string',
              },
              id: { type: 'string', format: 'uuid' },
              first_name: { type: 'string' },
              last_name: { type: 'string' },
              email: { type: 'string', format: 'email' },
              username: { type: 'string' },
              position: { type: 'string' },
              created_at: { type: 'string' },
              language: { type: ['string', 'null'] },
            },
            examples: [
              {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                first_name: 'Admin',
                last_name: 'Dev',
                email: 'admindev@gmail.com',
                username: 'admindev',
                password: 'password',
                position: 'Frontend Developer',
                language: 'null',
              },
            ],
          },
          401: {
            description: 'Invalid credentials',
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
            },
            examples: [{ message: 'email or password invalid' }],
          },
        },
      },
    },
    loginController,
  );
  app.post('/logout', logoutController);
};

export default authRoutes;
