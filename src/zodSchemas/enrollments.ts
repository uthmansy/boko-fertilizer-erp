import { z } from "zod";

// Define the Zod schema for enrollments
const EnrollmentSchema = z.object({
  email: z.string().email(), // Required field for email with validation
  role: z.string(), // Optional field for role
  enrolled_by: z.string(), // Optional field for role
  warehouse: z.string(), // Optional field for role
});

export default EnrollmentSchema;
