import { loginController, logoutController } from '@/controllers/auth/auth';
import { FastifyInstance } from '../types';

const authRoutes = async (app: FastifyInstance) => {
  app.post(
    '/login',
    {
      schema: {
        tags: ['Auth'],
        summary: 'User login',
        description: 'Authenticate using email or username with a password.',
        body: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email for authentication',
            },
            username: {
              type: 'string',
              description: 'Username for authentication',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Password for authentication',
            },
          },
          required: ['password'],
          oneOf: [{ required: ['email'] }, { required: ['username'] }],
          examples: [
            {
              email: 'admindev@gmail.com',
              password: 'password',
            },
            {
              username: 'admindev',
              password: 'password',
            },
          ],
        },
        response: {
          200: {
            description: 'Login successful',
            type: 'object',
            properties: {
              token: {
                type: 'string',
                description: 'JWT token for authentication',
              },
              id: { type: 'string', format: 'uuid', description: 'User ID' },
              first_name: {
                type: 'string',
                description: 'First name of the user',
              },
              last_name: {
                type: 'string',
                description: 'Last name of the user',
              },
              full_name: {
                type: 'string',
                description: 'Full name of the user',
              },
              email: {
                type: 'string',
                format: 'email',
                description: 'Email of the user',
              },
              username: { type: 'string', description: 'Username of the user' },
              position: {
                type: 'string',
                description: 'Job position of the user',
              },
              created_at: {
                type: 'string',
                description: 'Account creation date',
              },
              language: {
                type: ['string', 'null'],
                description: 'Preferred language',
              },
            },
            example: {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
              first_name: 'Admin',
              last_name: 'Dev',
              full_name: 'Admin Dev',
              email: 'admindev@gmail.com',
              username: 'admindev',
              position: 'Frontend Developer',
              created_at: '2023-01-01T00:00:00.000Z',
              language: 'en',
            },
          },
          401: {
            description: 'Invalid credentials',
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description:
                  'Error message indicating invalid login credentials',
              },
            },
            examples: [
              { message: 'email or password invalid' },
              { message: 'username or password invalid' },
            ],
          },
        },
      },
    },
    loginController,
  );

  // Endpoint for logging out
  app.post(
    '/logout',
    {
      schema: {
        tags: ['Auth'],
        summary: 'User logout',
        description: 'Logout the current authenticated user',
        response: {
          200: {
            description: 'Logout successful',
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Success message confirming logout',
              },
            },
            example: {
              message: 'User successfully logged out',
            },
          },
        },
      },
    },
    logoutController,
  );
};

export default authRoutes;
