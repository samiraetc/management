import { z } from "zod";

const workspaceCustomLabelSchema = z.object({
  name: z.string().min(1, "Name is required"),
  color: z.string().min(1, "Color is required"),
});

const workspaceDeleteCustomLabelSchema = z.object({
  label_id: z.string(),
});

const workspaceEditCustomLabelSchema = workspaceCustomLabelSchema.extend({
  label_id: z.string(),
});

export {
  workspaceDeleteCustomLabelSchema,
  workspaceCustomLabelSchema,
  workspaceEditCustomLabelSchema,
};
