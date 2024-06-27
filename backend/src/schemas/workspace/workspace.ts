import { z } from 'zod';

const workspaceSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  url_key: z.string().min(1, { message: 'URL key is required' }),
});

export { workspaceSchema };
