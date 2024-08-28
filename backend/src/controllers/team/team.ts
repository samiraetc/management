import { findUserByToken } from '@/middleware/auth';
import {
  createTeam,
  selectAllTeams,
  selectTeam,
  updateTeam,
} from '@/models/teams/teams';
import { editTeamSchema, teamSchema } from '@/models/teams/types';
import { selectUser } from '@/models/user/user';
import { selectAllWorkspaceLabel } from '@/models/workspace-labels/workspace-label';
import { selectWorkspaces } from '@/models/workspace/workspace';
import { MemberPermission } from '@/utils/member-permission';
import { FastifyReply, FastifyRequest } from 'fastify';

const createTeamController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };
    const user = await findUserByToken(request, reply);

    if (!user) {
      reply.code(400).send({ message: 'User not found' });
      return;
    }
    const parsedBody = teamSchema.parse(request.body);

    const body = {
      name: parsedBody.name,
      identifier: parsedBody.identifier,
      creator_id: user.id,
      labels: await selectAllWorkspaceLabel(id),
      permission: MemberPermission.ADMIN,
      workspace_id: id,
    };

    const team = await createTeam(body);
    const creator = await selectUser(user.id);

    reply.code(201).send({
      data: {
        ...team,
        creator,
      },
    });
  } catch (error) {
    reply.code(400).send(error);
  }
};

const editTeamController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };
    const user = await findUserByToken(request, reply);

    if (!user) {
      reply.code(400).send({ message: 'User not found' });
      return;
    }
    const parsedBody = editTeamSchema.parse(request.body);

    const body = {
      name: parsedBody.name,
      identifier: parsedBody.identifier,
    };

    const team = await updateTeam(body, id);

    reply.code(201).send({
      data: team,
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
      reply.code(400).send({ message: 'Team not found' });
      return;
    }

    const creator = await selectUser(team.creator_id);

    reply.code(200).send({
      data: {
        ...team,
        creator,
      },
    });
  } catch (error) {
    reply.code(400).send({ error });
  }
};

const getAllTeamsByWorkspace = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };
    const workspaces = await selectWorkspaces(id);

    if (!workspaces) {
      reply.code(400).send({ message: 'Workspace not found' });
      return;
    }

    const teams = await selectAllTeams(id);

    const team = await Promise.all(
      teams.map(async (workspace) => {
        return {
          ...workspace,
          creator: await selectUser(workspace.creator_id),
        };
      }),
    );

    reply.code(200).send({
      data: team,
    });
  } catch (error) {
    reply.code(400).send({ error });
  }
};

export {
  createTeamController,
  getTeamById,
  getAllTeamsByWorkspace,
  editTeamController,
};
