import { FastifyRequest, FastifyReply } from "fastify";
import { findUserByToken } from "@/middleware/auth";
import {
  workspaceCustomLabelSchema,
  workspaceMembersSchema,
  workspaceSchema,
} from "@/schemas/workspace/workspaceSchema";
import {
  addWorkspaceMembers,
  selectAllCustomLabel,
  selectAllWorkspaces,
  workspaceCustomLabel,
} from "@/models/workspace/workspace";
import { selectLabel } from "@/models/labels/labels";
import { selectUser } from "@/models/user/user";

const createWorkspaceController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const userId = findUserByToken(request, reply);
    const parsedBody = workspaceSchema.parse(request.body);

    /* const body = {
      first_name: parsedBody.first_name,
      last_name: parsedBody.last_name,
      email: parsedBody.email,
      password: parsedBody.password,
      created_at: new Date(),
      username: parsedBody.username,
      position: parsedBody.position,
      language: parsedBody.language,
    };

    const user = await createUser(body);

    const { password, ...userWithoutPassword } = user; */
    reply.code(201).send({ data: "" });
  } catch (error) {
    reply.code(400).send(error);
  }
};

const createWorkspaceCustomLabel = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as { id: string };
    const parsedBody = workspaceCustomLabelSchema.parse(request.body);

    const body = {
      workspace_id: id,
      name: parsedBody.name,
      color: parsedBody.color,
    };

    const customLabel = await workspaceCustomLabel(body);
    reply.code(201).send({ data: customLabel });
  } catch (error) {
    reply.code(400).send({ error: "Failed to create label", details: error });
  }
};

const addWorkspaceMember = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as { id: string };

    const parsedBody = workspaceMembersSchema.parse(request.body);
    
    const body = parsedBody.user_id.map((member: string) => ({
      workspace_id: id,
      user_id: member,
    }));

    console.log(body)

    const customLabel = await addWorkspaceMembers(body);
    reply.code(201).send({ data: customLabel });
  } catch (error) {
    reply.code(400).send({ error: "Failed to create label", details: error });
  }
};

const getAllWorkspaces = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const workspaces = await selectAllWorkspaces();

    const workspacesWithLabels = await Promise.all(
      workspaces.map(async (workspace) => {
        const creator = await selectUser(workspace.creator_id);

        const customLabels = await selectAllCustomLabel(workspace.id);

        const labels = await Promise.all(
          workspace.labels.map(async (label) => {
            return await selectLabel(label.label_id);
          })
        );

        const members = await Promise.all(
          workspace.members.map(async (member) => {
            return await selectUser(member.user_id);
          })
        );

        return {
          ...workspace,
          labels: [...labels, ...customLabels],
          creator,
          members,
        };
      })
    );

    reply.code(200).send({
      data: workspacesWithLabels,
    });
  } catch (error) {
    reply.code(400).send({ error });
  }
};

export {
  createWorkspaceController,
  getAllWorkspaces,
  createWorkspaceCustomLabel,
  addWorkspaceMember,
};
