import {
  addWorkspaceCustomLabel,
  deleteWorkspaceCustomLabel,
  editWorkspaceCustomLabel,
  selectWorkspaceCustomLabel,
} from "@/models/customLabel/customLabel";
import {
  selectCustomLabelByName,
  selectWorkspaces,
} from "@/models/workspace/workspace";
import {
  workspaceCustomLabelSchema,
} from "@/schemas/workspace/customLabels/customLabelsSchema";
import { FastifyReply, FastifyRequest } from "fastify";

const createWorkspaceCustomLabel = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id: workspace_id } = request.params as { id: string };
    const parsedBody = workspaceCustomLabelSchema.parse(request.body);

    const workspace = await selectWorkspaces(workspace_id);

    if (!workspace) {
      reply.code(404).send({ message: "Workspace not found" });
      return;
    }

    const labelByName = await selectCustomLabelByName(parsedBody.name, workspace_id);

    if (labelByName) {
      reply.code(404).send({ message: "Name already exist" });
      return;
    }

    const body = {
      workspace_id,
      name: parsedBody.name,
      color: parsedBody.color,
    };

    const customLabel = await addWorkspaceCustomLabel(body);
    reply.code(201).send({ data: customLabel });
  } catch (error) {
    reply.code(400).send({ error: "Failed to create label", details: error });
  }
};

const patchWorkspaceCustomLabel = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id: workspace_id, label_id } = request.params as { id: string; label_id: string };

    const workspace = await selectWorkspaces(workspace_id);

    if (!workspace) {
      reply.code(404).send({ message: "Workspace not found" });
      return;
    }

    const customLabel = await selectWorkspaceCustomLabel(label_id, workspace_id);

    console.log(customLabel)

    if (!customLabel) {
      reply.code(404).send({ message: "Label not found" });
      return;
    }

    const parsedBody = workspaceCustomLabelSchema.parse(request.body);

    const body = {
      workspace_id,
      name: parsedBody.name,
      color: parsedBody.color,
    };

    const editedLabel = await editWorkspaceCustomLabel(body, label_id);
    reply.code(201).send({ data: editedLabel });
  } catch (error) {
    reply.code(400).send({ error: "Failed to edit label", details: error });
  }
};

const removeWorkspaceCustomLabel = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id: workspace_id, label_id } = request.params as { id: string; label_id: string };

    const workspace = await selectWorkspaces(workspace_id);
    if (!workspace) {
      reply.code(404).send({ message: "Workspace not found" });
      return;
    }

    const customLabel = await selectWorkspaceCustomLabel(label_id, workspace_id);
    if (!customLabel) {
      reply.code(404).send({ message: "Label not found" });
      return;
    }

    const deleteLabel = await deleteWorkspaceCustomLabel(label_id);
    reply.code(201).send({ data: deleteLabel });
  } catch (error) {
    reply.code(400).send({ error: "Failed to delete label", details: error });
  }
};

export {
  createWorkspaceCustomLabel,
  patchWorkspaceCustomLabel,
  removeWorkspaceCustomLabel,
};
