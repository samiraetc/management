import { FastifyInstance } from "fastify";
import {
  createWorkspaceController,
  getAllWorkspaces,
  getWorkspace,
} from "@/controllers/workspace/workspaceController";
import {
  createWorkspaceCustomLabel,
  patchWorkspaceCustomLabel,
} from "@/controllers/customLabels/customLabelController";
import {
  addWorkspaceMember,
  removeWorkspaceMember,
} from "@/controllers/members/membersController";

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
  server.get(
    "/workspaces/:id",
    { preValidation: [server.authenticate] },
    getWorkspace
  );
  server.post(
    "/workspaces/:id/labels",
    { preValidation: [server.authenticate] },
    createWorkspaceCustomLabel
  );
  server.patch(
    "/workspaces/:id/labels",
    { preValidation: [server.authenticate] },
    patchWorkspaceCustomLabel
  );
  server.post(
    "/workspaces/:id/members",
    { preValidation: [server.authenticate] },
    addWorkspaceMember
  );
  server.delete(
    "/workspaces/:id/members",
    { preValidation: [server.authenticate] },
    removeWorkspaceMember
  );
};

export default workspaceRouters;
