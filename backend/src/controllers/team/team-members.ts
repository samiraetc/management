import { selectTeam } from '@/models/teams/teams';
import {
  addTeamsMembers,
  deleteTeamMember,
  editTeamsMembers,
  selectAllTeamsMember,
  selectTeamsMember,
} from '@/models/teams/team-members';
import { selectUser } from '@/models/user/user';
import {
  editTeamMembersSchema,
  teamMembersSchema,
} from '@/schemas/team/team-members';
import { MemberPermission } from '@/utils/member-permission';
import { TeamMembers } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';

const selectAllTeamMembers = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };

    const team = await selectTeam(id);

    if (!team) {
      reply.code(404).send({ message: 'Team not found' });
      return;
    }

    const member = await selectAllTeamsMember(id);

    const members = await Promise.all(
      member.map(async (member: TeamMembers) => {
        const selectedMember = await selectUser(member.user_id);
        return await { ...selectedMember, permission: member.permission };
      }),
    );
    reply.code(201).send({ data: members });
  } catch (error) {
    reply
      .code(400)
      .send({ error: 'Failed to select all team labels', details: error });
  }
};

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

const editTeamMembers = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id, member_id } = request.params as {
      id: string;
      member_id: string;
    };
    const parsedBody = editTeamMembersSchema.parse(request.body);

    const member = await selectTeamsMember({
      team_id: id,
      user_id: member_id,
    });

    if (!member) {
      reply.code(404).send({ message: 'Member not found' });
      return;
    }

    const body = {
      team_id: id,
      user_id: member_id,
      permission: parsedBody.permission,
    };

    const editedMember = await editTeamsMembers(body);
    const selectedMember = await selectUser(editedMember.user_id);

    reply
      .code(201)
      .send({ data: { ...selectedMember, permission: member.permission } });
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

export {
  addTeamMember,
  removeTeamMember,
  selectAllTeamMembers,
  editTeamMembers,
};
