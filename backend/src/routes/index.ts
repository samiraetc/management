import { FastifyInstance } from 'fastify';

import authRoutes from './authRoutes';
import labelRoutes from './labelRoutes';
import userRoutes from './userRoutes';
import workspaceLabelsRouters from './workspaceLabelsRoutes';
import workspaceMembersRouters from './workspaceMembersRoutes';
import workspaceRouters from './workspaceRoutes';
import priorityRoutes from './priorityRoutes';

const routes = async (app: FastifyInstance) => {
  app.register(authRoutes);
  app.register(userRoutes);
  app.register(labelRoutes);
  app.register(workspaceRouters);
  app.register(workspaceLabelsRouters);
  app.register(workspaceMembersRouters);
  app.register(priorityRoutes)
};

export default routes;
