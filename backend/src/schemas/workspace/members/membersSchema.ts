import { z } from "zod";

const workspaceMembersSchema = z.object({
    user_ids: z.string().min(1, "User is required").array(),
  });

  export {
    workspaceMembersSchema
  }