/* eslint-disable prettier/prettier */
import { z } from 'zod';
import { WorkspaceLabels } from '@prisma/client';

export type EditWorkspaceLabels = Omit<WorkspaceLabels, 'workspace_id' | 'id'>;

export type CreateWorkspaceLabel = Omit<WorkspaceLabels, 'id'>;

const WorkspaceLabelSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  color: z.string().min(1, 'Color is required'),
  can_edit: z.boolean(),
  workspace_id: z.string(),
});

const createWorkspaceLabelsSchema = WorkspaceLabelSchema.omit({
  workspace_id: true,
  can_edit: true,
  id: true,
});

const EditWorkspaceLabelSchema = z.object({
  name: z.string().optional(),
  color: z.string().optional()

})

export { WorkspaceLabelSchema, createWorkspaceLabelsSchema, EditWorkspaceLabelSchema };
