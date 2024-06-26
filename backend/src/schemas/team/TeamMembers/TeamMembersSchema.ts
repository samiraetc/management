import { z } from "zod";

const teamMembersSchema = z.object({
    user_ids: z.string().min(1, "User is required").array(),
  });

  export {
    teamMembersSchema
  }
