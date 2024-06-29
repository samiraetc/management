import { Label } from '@prisma/client';
import { z } from 'zod';

export type CreateLabel = Omit<Label, 'id'>;

const labelSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  color: z.string().min(1, 'Color is required'),
});

const createLabelSchema = labelSchema.omit({ id: true });

export { labelSchema, createLabelSchema };
