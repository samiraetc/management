import { FastifyInstance } from "fastify";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import labelRoutes from "./labelRoutes";
import workspaceRouters from "./workspaceRoutes";
import workspaceLabelsRouters from "./workspaceLabelsRoutes";
import workspaceMembersRouters from "./workspaceMembersRoutes";

const routes = async (app: FastifyInstance) => {
  app.register(authRoutes);
  app.register(userRoutes);
  app.register(labelRoutes);
  app.register(workspaceRouters);
  app.register(workspaceLabelsRouters);
  app.register(workspaceMembersRouters);
};

export default routes;
