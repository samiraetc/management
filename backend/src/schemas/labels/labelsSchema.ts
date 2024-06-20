import { z } from "zod";

const labelSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  color: z.string().min(1, "Color is required"),
});

export { labelSchema };
