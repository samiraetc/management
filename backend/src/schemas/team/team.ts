import { z } from 'zod';

const teamSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  identifier: z
    .string()
    .min(1, { message: 'URL key is required' })
    .max(5, { message: 'Only 5 letters' }),
  workspace_id: z.string().min(1, { message: 'Workspace is required' }),
});

export { teamSchema };
