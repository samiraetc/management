import { FastifyInstance } from "fastify";
import {
  createWorkspaceController,
  createWorkspaceCustomLabel,
  getAllWorkspaces,
  addWorkspaceMember,
} from "@/controllers/workspace/workspaceController";

const workspaceRouters = async (server: FastifyInstance) => {
  server.post(
    "/workspaces",
    { preValidation: [server.authenticate] },
    createWorkspaceController
  );
  server.get(
    "/workspaces",
    { preValidation: [server.authenticate] },
    getAllWorkspaces
  );
  server.post(
    "/workspace/:id/label",
    { preValidation: [server.authenticate] },
    createWorkspaceCustomLabel
  );
  server.post(
    "/workspace/:id/members",
    { preValidation: [server.authenticate] },
    addWorkspaceMember
  );
};

export default workspaceRouters;
