import {
  addWorkspaceMembers,
  deleteWorkspaceMember,
} from "@/models/members/members";
import { workspaceMembersSchema } from "@/schemas/members/membersSchema";
import { FastifyReply, FastifyRequest } from "fastify";

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

    const customLabel = await addWorkspaceMembers(body);
    reply.code(201).send({ data: customLabel });
  } catch (error) {
    reply.code(400).send({ error: "Failed to create label", details: error });
  }
};

const removeWorkspaceMember = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as { id: string };

    const parsedBody = workspaceMembersSchema.parse(request.body);

    const body = {
      workspace_id: id,
      user_id: parsedBody.user_id[0],
    };

    const deletedMember = await deleteWorkspaceMember(body);
    reply.code(201).send({ data: deletedMember });
  } catch (error) {
    reply.code(400).send({ error: "Failed to remove member", details: error });
  }
};

export { addWorkspaceMember, removeWorkspaceMember };
