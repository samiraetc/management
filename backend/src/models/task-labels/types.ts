/* eslint-disable prettier/prettier */
import { z } from 'zod';

const createTaskLabelsSchema = z.object({
  labels_ids: z.string().min(1, 'User is required').array(),
});

export { createTaskLabelsSchema };
