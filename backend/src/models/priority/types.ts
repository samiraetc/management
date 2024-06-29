import { Priority } from '@prisma/client';
import { z } from 'zod';

export type CreatePriority = Omit<Priority, 'id'>;

const prioritySchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  value: z.string(),
});

const createPrioritySchema = prioritySchema.omit({ id: true });

export { prioritySchema, createPrioritySchema };
