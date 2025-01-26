import { z } from "zod";

// Define the Zod schema
export const updateProfileSchema = z.object({
  id: z.string().uuid(),
  avatar_url: z.string().optional(),
  full_name: z.string().optional(),
});
