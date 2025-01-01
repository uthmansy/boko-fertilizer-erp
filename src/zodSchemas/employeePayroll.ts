import { z } from "zod";

// Define the Zod schema for payrolls
const UpdateEmployeePayrollSchema = z.object({
  to_be_paid: z.number().optional(), // Required field for month, must be between 1 and 12
  note: z.string().optional(), // Required field for year, must be 2000 or later
  id: z.string().uuid(), // Required field for year, must be 2000 or later
});

export default UpdateEmployeePayrollSchema;
