import { addTeamLabel, deleteTeamLabel, editTeamLabel, selectTeamLabel, selectTeamLabelByName } from "@/models/teams/TeamsLabel/TeamsLabelModel";
import { selectTeam } from "@/models/teams/TeamsModel"
import { teamLabelSchema } from "@/schemas/team/TeamLabel/TeamLabelSchema";
import { FastifyReply, FastifyRequest } from "fastify";

const createTeamLabel = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id: team_id } = request.params as { id: string };
    const parsedBody = teamLabelSchema.parse(request.body);

    const workspace = await selectTeam(team_id);

    if (!workspace) {
      reply.code(404).send({ message: "Team not found" });
      return;
    }

    const labelByName = await selectTeamLabelByName(parsedBody.name, team_id);

    if (labelByName) {
      reply.code(404).send({ message: "Name already exist" });
      return;
    }

    const body = {
      team_id,
      name: parsedBody.name,
      color: parsedBody.color,
      can_edit: true
    };

    const Label = await addTeamLabel(body);
    reply.code(201).send({ data: Label });
  } catch (error) {
    reply.code(400).send({ error: "Failed to create label", details: error });
  }
};

const patchTeamLabel = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id: team_id, label_id } = request.params as { id: string; label_id: string };

    const workspace = await selectTeam(team_id);

    if (!workspace) {
      reply.code(404).send({ message: "Team not found" });
      return;
    }

    const label = await selectTeamLabel(label_id, team_id);


    if (!label) {
      reply.code(404).send({ message: "Label not found" });
      return;
    }

    const parsedBody = teamLabelSchema.parse(request.body);

    const body = {
      team_id,
      name: parsedBody.name,
      color: parsedBody.color,
      can_edit: label.can_edit
    };

    const editedLabel = await editTeamLabel(body, label_id);
    reply.code(201).send({ data: editedLabel });
  } catch (error) {
    reply.code(400).send({ error: "Failed to edit label", details: error });
  }
};

const removeTeamLabel = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id: team_id, label_id } = request.params as { id: string; label_id: string };

    const workspace = await selectTeam(team_id);
    if (!workspace) {
      reply.code(404).send({ message: "Team not found" });
      return;
    }

    const Label = await selectTeamLabel(label_id, team_id);
    if (!Label) {
      reply.code(404).send({ message: "Label not found" });
      return;
    }

    const deleteLabel = await deleteTeamLabel(label_id);
    reply.code(201).send({ data: deleteLabel });
  } catch (error) {
    reply.code(400).send({ error: "Failed to delete label", details: error });
  }
};

export {
  createTeamLabel,
  patchTeamLabel,
  removeTeamLabel,
};
