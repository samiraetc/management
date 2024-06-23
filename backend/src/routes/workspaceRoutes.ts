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
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ["Workspace"],
        security: [{ bearerAuth: [] }],
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
            url_key: { type: "string" },
          },
          examples: [
            {
              name: "workspace",
              url_key: "url_workspace",
            },
          ],
          required: ["name", "url_key"],
        },
        response: {
          201: {
            description: "Workspace details",
            type: "object",
            properties: {
              data: {
                id: { type: "string" },
                name: { type: "string" },
                created_at: { type: "string" },
                updated_at: { type: "string" },
                creator_id: { type: "string" },
                url_key: { type: "string" },
                labels: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      name: { type: "string" },
                      color: { type: "string" },
                    },
                  },
                },
                members: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      first_name: { type: "string" },
                      last_name: { type: "string" },
                      full_name: { type: "string" },
                      email: { type: "string", format: "email" },
                      created_at: { type: "string" },
                      username: { type: "string" },
                      position: { type: "string" },
                      language: { type: ["string", "null"] },
                    },
                  },
                },
                creator: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    first_name: { type: "string" },
                    last_name: { type: "string" },
                    full_name: { type: "string" },
                    email: { type: "string", format: "email" },
                    created_at: { type: "string" },
                    username: { type: "string" },
                    position: { type: "string" },
                    language: { type: ["string", "null"] },
                  },
                },
              },
            },
          },
        },
      },
    },
    createWorkspaceController
  );

  server.get(
    "/workspaces",
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ["Workspace"],
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: "List of workspaces",
            type: "object",
            properties: {
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    name: { type: "string" },
                    created_at: { type: "string" },
                    updated_at: { type: "string" },
                    creator_id: { type: "string" },
                    url_key: { type: "string" },
                    labels: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          name: { type: "string" },
                          color: { type: "string" },
                        },
                      },
                    },
                    members: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          first_name: { type: "string" },
                          last_name: { type: "string" },
                          full_name: { type: "string" },
                          email: { type: "string", format: "email" },
                          created_at: { type: "string" },
                          username: { type: "string" },
                          position: { type: "string" },
                          language: { type: ["string", "null"] },
                        },
                      },
                    },
                    creator: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        first_name: { type: "string" },
                        last_name: { type: "string" },
                        full_name: { type: "string" },
                        email: { type: "string", format: "email" },
                        created_at: { type: "string" },
                        username: { type: "string" },
                        position: { type: "string" },
                        language: { type: ["string", "null"] },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    getAllWorkspaces
  );
  server.get(
    "/workspaces/:id",
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ["Workspace"],
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: "Workspace details",
            type: "object",
            properties: {
              data: {
                id: { type: "string" },
                name: { type: "string" },
                created_at: { type: "string" },
                updated_at: { type: "string" },
                creator_id: { type: "string" },
                url_key: { type: "string" },
                labels: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      name: { type: "string" },
                      color: { type: "string" },
                    },
                  },
                },
                members: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      first_name: { type: "string" },
                      last_name: { type: "string" },
                      full_name: { type: "string" },
                      email: { type: "string", format: "email" },
                      created_at: { type: "string" },
                      username: { type: "string" },
                      position: { type: "string" },
                      language: { type: ["string", "null"] },
                    },
                  },
                },
                creator: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    first_name: { type: "string" },
                    last_name: { type: "string" },
                    full_name: { type: "string" },
                    email: { type: "string", format: "email" },
                    created_at: { type: "string" },
                    username: { type: "string" },
                    position: { type: "string" },
                    language: { type: ["string", "null"] },
                  },
                },
              },
            },
          },
        },
      },
    },
    getWorkspace
  );
};

export default workspaceRouters;
