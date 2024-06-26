import {
  addTeamsMembers,
  deleteTeamMember,
  selectTeamsMember,
} from '@/models/teams/TeamsMembers/TeamsMembersModel';
import { teamMembersSchema } from '@/schemas/team/TeamMembers/TeamMembersSchema';
import { MemberPermission } from '@/utils/MemberPermission';
import { FastifyReply, FastifyRequest } from 'fastify';

const addTeamMember = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const parsedBody = teamMembersSchema.parse(request.body);

    const body = parsedBody.user_ids.map((member: string) => ({
      team_id: id,
      user_id: member,
      permission: MemberPermission.MEMBER,
    }));

    const member = await addTeamsMembers(body);
    reply.code(201).send({ data: member });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to create member', details: error });
  }
};

const removeTeamMember = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id, member_id } = request.params as {
      id: string;
      member_id: string;
    };

    const body = {
      team_id: id,
      user_id: member_id,
    };

    const member = await selectTeamsMember(body);

    if (!member) {
      reply.code(404).send({ message: 'Member not found' });
      return;
    }

    const deletedMember = await deleteTeamMember(body);
    reply.code(201).send({ data: deletedMember });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to remove member', details: error });
  }
};

export { addTeamMember, removeTeamMember };
