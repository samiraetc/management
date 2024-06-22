import { z } from "zod";

const prioritySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  value: z.number()
});

export { prioritySchema };
