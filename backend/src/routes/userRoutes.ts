import { FastifyInstance } from 'fastify';
import { createUserController, getAllUsers, selectUserController } from '@/controllers/user/userController';

const userRoutes = async (server: FastifyInstance) => {
  server.post('/users', createUserController);
  server.get("/users/:userId", { preValidation: [server.authenticate] }, selectUserController);
  server.get("/users", { preValidation: [server.authenticate] }, getAllUsers);
};

export default userRoutes;
