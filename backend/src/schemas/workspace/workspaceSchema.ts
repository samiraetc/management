import { z } from 'zod';

const workspaceSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  creator: z.string().min(1, { message: "Creator is required" }), 
  url_key: z.string().min(1, { message: "URL key is required" }),
});


const workspaceCustomLabelSchema = z.object({
  name: z.string().min(1, "Name is required"),
  color: z.string().min(1, "Color is required"),
});

const workspaceMembersSchema = z.object({
  user_id: z.string().min(1, "User is required").array(),
});



export { workspaceSchema, workspaceCustomLabelSchema, workspaceMembersSchema };
