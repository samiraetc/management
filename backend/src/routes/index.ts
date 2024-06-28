import { FastifyInstance } from 'fastify';

import authRoutes from './auth';
import estimativesRoutes from './estimatives';
import labelRoutes from './labels';
import priorityRoutes from './priorities';
import teamLabelsRoutes from './team-labels';
import teamRoutes from './team';
import userRoutes from './user';
import workspaceLabelsRouters from './workspace-labels';
import workspaceMembersRouters from './workspace-members';
import workspaceRouters from './workspace';
import teamMembersRoutes from './team-members';

const routes = async (app: FastifyInstance) => {
  app.register(estimativesRoutes);
  app.register(labelRoutes);
  app.register(authRoutes);
  app.register(priorityRoutes);
  app.register(userRoutes);
  app.register(workspaceRouters);
  app.register(workspaceLabelsRouters);
  app.register(workspaceMembersRouters);
  app.register(teamRoutes);
  app.register(teamLabelsRoutes);
  app.register(teamMembersRoutes);
};

export default routes;
