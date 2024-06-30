/* eslint-disable prettier/prettier */
import { z } from 'zod';
import { TeamLabels } from '@prisma/client';

export type EditTeamLabels = Omit<TeamLabels, 'workspace_id' | 'id'>;

export type CreateTeamLabelByWorkspace = Omit<
  TeamLabels,
  'can_edit' | 'team_id'
> & {
  workspace_id: string;
};

export type CreateTeamLabel = Omit<TeamLabels, 'id'>;

const teamLabelSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  color: z.string().min(1, 'Color is required'),
  can_edit: z.boolean(),
  team_id: z.string(),
});

const createAndEditTeamLabel = teamLabelSchema.omit({
  team_id: true,
  can_edit: true,
  id: true,
});

export { teamLabelSchema, createAndEditTeamLabel };
