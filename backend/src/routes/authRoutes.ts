import { loginController } from "@/controllers/auth/authController";
import { FastifyInstance } from "@/types";

const authRoutes = async (app: FastifyInstance) => {
  app.post(
    "/login",
    {
      schema: {
        tags: ["Login"],
        description: "It can use email or username to login",
        body: {
          type: 'object',
          properties: {
            email: { 
              type: "string", 
              format: "email",
            
            },
            username: { 
              type: "string",
             
            },
            password: { 
              type: "string", 
              format: "password",
             
            },
          },
          examples: [
            { email: 'admindev@gmail.com', password: 'password' },
          ],
          required: ['password'],
          oneOf: [
            { required: ["email"] },
            { required: ["username"] }
          ]
        },
        
        response: {
          200: {
            description: "Login successful",
            type: "object",
            properties: {
              token: { 
                type: "string",
              },
              user: {
                type: "object",
                properties: {
                  id: { 
                    type: "string",
                  },
                  email: { 
                    type: "string", 
                    format: "email",
                    
                  },
                  username: { 
                    type: "string",
                   
                  }
                }
              }
            },
            examples: [
              { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            ],
          },
          401: {
            description: "Invalid credentials",
            type: "object",
            properties: {
              message: { 
                type: "string",
              }
            },
            examples: [
              { message: 'email or password invalid' },
            ],
          }
        }
      }
    },
    loginController
  );
};

export default authRoutes;
