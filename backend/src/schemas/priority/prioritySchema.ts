import { z } from "zod";

const prioritySchema = z.object({
  name: z.string().min(1, "Name is required"),
  value: z.string()
});

export { prioritySchema };
