import {
  addTeamLabel,
  deleteTeamLabel,
  editTeamLabel,
  selectAllTeamLabel,
  selectTeamLabel,
  selectTeamLabelByName,
} from '@/models/team-labels/team-labels';
import { createAndEditTeamLabel } from '@/models/team-labels/types';
import { findTeam } from '@/models/teams/teams';
import { FastifyReply, FastifyRequest } from 'fastify';

const selectAllTeamLabels = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };

    const team = await findTeam(id);

    if (!team) {
      reply.code(404).send({ message: 'Workspace not found' });
      return;
    }

    const labels = await selectAllTeamLabel(id);
    reply.code(200).send({ data: labels });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to create label', details: error });
  }
};

const createTeamLabel = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id: team_id } = request.params as { id: string };
    const parsedBody = createAndEditTeamLabel.parse(request.body);

    const team = await findTeam(team_id);

    if (!team) {
      reply.code(404).send({ message: 'Team not found' });
      return;
    }

    const labelByName = await selectTeamLabelByName(parsedBody.name, team_id);

    if (labelByName) {
      reply.code(404).send({ message: 'Name already exist' });
      return;
    }

    const body = {
      team_id,
      name: parsedBody.name,
      color: parsedBody.color,
      created_at: new Date(),
      can_edit: true,
    };

    const Label = await addTeamLabel(body);
    reply.code(201).send({ data: Label });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to create label', details: error });
  }
};

const updateTeamLabel = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id: team_id, label_id } = request.params as {
      id: string;
      label_id: string;
    };

    const team = await findTeam(team_id);

    if (!team) {
      reply.code(404).send({ message: 'Team not found' });
      return;
    }

    const label = await selectTeamLabel(label_id, team_id);

    if (!label) {
      reply.code(404).send({ message: 'Label not found' });
      return;
    }

    const parsedBody = createAndEditTeamLabel.parse(request.body);

    const body = {
      team_id,
      name: parsedBody.name,
      color: parsedBody.color,
      created_at: label.created_at,
      can_edit: label.can_edit,
    };

    const editedLabel = await editTeamLabel(body, label_id);

    reply.code(200).send({ data: editedLabel });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to edit label', details: error });
  }
};

const removeTeamLabel = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id: team_id, label_id } = request.params as {
      id: string;
      label_id: string;
    };

    const team = await findTeam(team_id);

    if (!team) {
      reply.code(404).send({ message: 'Team not found' });
      return;
    }

    const Label = await selectTeamLabel(label_id, team_id);
    if (!Label) {
      reply.code(404).send({ message: 'Label not found' });
      return;
    }

    const deleteLabel = await deleteTeamLabel(label_id);
    reply.code(200).send({ data: deleteLabel });
  } catch (error) {
    reply.code(400).send({ error: 'Failed to delete label', details: error });
  }
};

export {
  createTeamLabel,
  updateTeamLabel,
  removeTeamLabel,
  selectAllTeamLabels,
};
