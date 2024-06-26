import { findUserByToken } from '@/middleware/auth';
import { selectAllTeamLabel, selectTeamLabel } from '@/models/teams/TeamsLabel/TeamsLabelModel';
import { createTeam, selectTeam } from '@/models/teams/TeamsModel';
import { selectUser } from '@/models/user/userModel';
import { selectAllWorkspaceLabel } from '@/models/workspace/WorkspaceLabel/WorkspaceLabelModel';
import { teamSchema } from '@/schemas/team/teamSchema';
import { MemberPermission } from '@/utils/MemberPermission';
import { FastifyReply, FastifyRequest } from 'fastify';



const createTeamController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const user = await findUserByToken(request, reply);

    if (!user) {
      reply.code(400).send({ message: 'User not found' });
      return;
    }
    const parsedBody = teamSchema.parse(request.body);

    const body = {
      name: parsedBody.name,
      identifier: parsedBody.identifier,
      creator: user.id,
      labels: await selectAllWorkspaceLabel(parsedBody.workspace_id),
      permission: MemberPermission.ADMIN,
      workspace_id: parsedBody.workspace_id,
    };

    const team = await createTeam(body);
    const creator = await selectUser(team.creator_id);

    const labels = await Promise.all(
      team.labels.map(async (label: { label_id: string }) => {
        return await selectTeamLabel(label.label_id, team.id);
      }),
    );

    const members = await Promise.all(
      team.members.map(async (member: { user_id: string }) => {
        return await selectUser(member.user_id);
      }),
    );

    reply.code(201).send({
      data: {
        ...team,
        labels,
        creator,
        members,
      },
    });
  } catch (error) {
    reply.code(400).send(error);
  }
};

const getTeamById = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };

    const team = await selectTeam(id);

    if (!team) {
      reply.code(404).send({ message: 'Team not found' });
      return;
    }

    const creator = await selectUser(team.creator_id);

    const labels = await selectAllTeamLabel(team.id);

    const members = await Promise.all(
      team.members.map(async (member) => {
        const selectedMember = await selectUser(member.user_id);
        return await { ...selectedMember, permission: member.permission };
      }),
    );

    reply.code(200).send({
      data: {
        ...team,
        labels,
        creator,
        members,
      },
    });
  } catch (error) {
    reply.code(400).send({ error });
  }
};

export { createTeamController, getTeamById };
