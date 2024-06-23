import { FastifyInstance } from 'fastify';

import authRoutes from './authRoutes';
import estimativesRoutes from './estimativeRoutes';
import labelRoutes from './labelRoutes';
import priorityRoutes from './priorityRoutes';
import userRoutes from './userRoutes';
import workspaceLabelsRouters from './workspaceLabelsRoutes';
import workspaceMembersRouters from './workspaceMembersRoutes';
import workspaceRouters from './workspaceRoutes';

const routes = async (app: FastifyInstance) => {
  app.register(estimativesRoutes)
  app.register(labelRoutes);
  app.register(authRoutes);
  app.register(priorityRoutes);
  app.register(userRoutes);
  app.register(workspaceRouters);
  app.register(workspaceLabelsRouters);
  app.register(workspaceMembersRouters);

};

export default routes;
