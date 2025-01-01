import { z } from "zod";

// Define the Zod schema for payrolls
const PayrollSchema = z.object({
  month: z.number().int().min(1).max(12), // Required field for month, must be between 1 and 12
  year: z.number().int().min(2000), // Required field for year, must be 2000 or later
});

export default PayrollSchema;
