import {
  addWorkspaceCustomLabel,
  deleteWorkspaceCustomLabel,
  editWorkspaceCustomLabel,
  selectWorkspaceCustomLabel,
} from "@/models/customLabel/customLabel";
import { selectWorkspaces } from "@/models/workspace/workspace";
import {
  workspaceCustomLabelSchema,
  workspaceDeleteCustomLabelSchema,
  workspaceEditCustomLabelSchema,
} from "@/schemas/workspace/customLabels/customLabelsSchema";
import { FastifyReply, FastifyRequest } from "fastify";

const createWorkspaceCustomLabel = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as { id: string };
    const parsedBody = workspaceCustomLabelSchema.parse(request.body);

    const workspace = await selectWorkspaces(id);

    if (!workspace) {
      reply.code(404).send({ message: "Workspace not found" });
      return;
    }

    const body = {
      workspace_id: id,
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
    const { id } = request.params as { id: string };
    const parsedBody = workspaceEditCustomLabelSchema.parse(request.body);

    const workspace = await selectWorkspaces(id);

    if (!workspace) {
      reply.code(404).send({ message: "Workspace not found" });
      return;
    }

    const customLabel = await selectWorkspaceCustomLabel(parsedBody.label_id);
    if (!customLabel) {
      reply.code(404).send({ message: "Label not found" });
      return;
    }

    const body = {
      workspace_id: id,
      name: parsedBody.name,
      color: parsedBody.color,
    };

    const editedLabel = await editWorkspaceCustomLabel(body, id);
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
    const { id } = request.params as { id: string };
    const parsedBody = workspaceDeleteCustomLabelSchema.parse(request.body);

    const workspace = await selectWorkspaces(id);
    if (!workspace) {
      reply.code(404).send({ message: "Workspace not found" });
      return;
    }

    const customLabel = await selectWorkspaceCustomLabel(parsedBody.label_id);
    if (!customLabel) {
      reply.code(404).send({ message: "Label not found" });
      return;
    }

    const deleteLabel = await deleteWorkspaceCustomLabel(parsedBody.label_id);
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
