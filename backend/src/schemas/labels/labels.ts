import { z } from 'zod';

const labelSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  color: z.string().min(1, 'Color is required'),
});

export { labelSchema };
