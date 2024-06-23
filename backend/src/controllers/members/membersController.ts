import {
  addWorkspaceMembers,
  deleteWorkspaceMember,
  selectWorkspaceMember,
} from "@/models/members/members";
import { workspaceMembersSchema } from "@/schemas/workspace/members/membersSchema";
import { FastifyReply, FastifyRequest } from "fastify";

const addWorkspaceMember = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as { id: string };
    const parsedBody = workspaceMembersSchema.parse(request.body);

    const body = parsedBody.user_ids.map((member: string) => ({
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
    const { id, member_id } = request.params as {
      id: string;
      member_id: string;
    };

    const body = {
      workspace_id: id,
      user_id: member_id,
    };

    const member = await selectWorkspaceMember(body);

    if (!member) {
      reply.code(404).send({ message: "Member not found" });
      return;
    }

    const deletedMember = await deleteWorkspaceMember(body);
    reply.code(201).send({ data: deletedMember });
  } catch (error) {
    reply.code(400).send({ error: "Failed to remove member", details: error });
  }
};

export { addWorkspaceMember, removeWorkspaceMember };
