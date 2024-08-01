/* eslint-disable prettier/prettier */
import { z } from 'zod';
import { Team, WorkspaceLabels } from '@prisma/client';

type Labels = Omit<WorkspaceLabels, 'workspace_id'>;

export type CreateTeam = Omit<Team, 'created_at' | 'id' | 'estimates_type'> & {
  labels: Labels[];
  permission: string;
};

const teamSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  identifier: z
    .string()
    .min(1, { message: 'URL key is required' })
    .max(5, { message: 'Only 5 letters' }),
});

export { teamSchema };
