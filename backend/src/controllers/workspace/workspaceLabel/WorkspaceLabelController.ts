import { addWorkspaceLabel, deleteWorkspaceLabel, editWorkspaceLabel, selectWorkspaceLabel, selectWorkspaceLabelByName } from "@/models/workspace/WorkspaceLabel/WorkspaceLabelModel";
import { selectWorkspaces } from "@/models/workspace/WorkspaceModel";
import { workspaceLabelSchema } from "@/schemas/workspace/workspaceLabel/workspaceLabelSchema";
import { FastifyReply, FastifyRequest } from "fastify";

const createWorkspaceLabel = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id: workspace_id } = request.params as { id: string };
    const parsedBody = workspaceLabelSchema.parse(request.body);

    const workspace = await selectWorkspaces(workspace_id);

    if (!workspace) {
      reply.code(404).send({ message: "Workspace not found" });
      return;
    }

    const labelByName = await selectWorkspaceLabelByName(parsedBody.name, workspace_id);

    if (labelByName) {
      reply.code(404).send({ message: "Name already exist" });
      return;
    }

    const body = {
      workspace_id,
      name: parsedBody.name,
      color: parsedBody.color,
      can_edit: true
    };

    const Label = await addWorkspaceLabel(body);
    reply.code(201).send({ data: Label });
  } catch (error) {
    reply.code(400).send({ error: "Failed to create label", details: error });
  }
};

const patchWorkspaceLabel = async (
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

    const label = await selectWorkspaceLabel(label_id, workspace_id);


    if (!label) {
      reply.code(404).send({ message: "Label not found" });
      return;
    }

    const parsedBody = workspaceLabelSchema.parse(request.body);

    const body = {
      workspace_id,
      name: parsedBody.name,
      color: parsedBody.color,
      can_edit: label.can_edit
    };

    const editedLabel = await editWorkspaceLabel(body, label_id);
    reply.code(201).send({ data: editedLabel });
  } catch (error) {
    reply.code(400).send({ error: "Failed to edit label", details: error });
  }
};

const removeWorkspaceLabel = async (
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

    const Label = await selectWorkspaceLabel(label_id, workspace_id);
    if (!Label) {
      reply.code(404).send({ message: "Label not found" });
      return;
    }

    const deleteLabel = await deleteWorkspaceLabel(label_id);
    reply.code(201).send({ data: deleteLabel });
  } catch (error) {
    reply.code(400).send({ error: "Failed to delete label", details: error });
  }
};

export {
  createWorkspaceLabel,
  patchWorkspaceLabel,
  removeWorkspaceLabel,
};
