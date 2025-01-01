import { z } from "zod";

// Define the Zod schema
const EditUserSchema = z.object({
  id: z.string().uuid(),
  warehouse: z.string().optional(),
  role: z.string().optional(),
});

export default EditUserSchema;
