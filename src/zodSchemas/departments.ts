import { z } from "zod";

// Define the Zod schema for departments
const DepartmentSchema = z.object({
  name: z.string(), // Required field for department name
  description: z.string().optional(), // Required field for department name
});

export default DepartmentSchema;
