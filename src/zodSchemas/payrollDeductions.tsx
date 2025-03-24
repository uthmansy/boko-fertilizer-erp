import { z } from "zod";

// 1. Define the deduction_type enum (matches PostgreSQL enum)
const DeductionTypeEnum = z.enum(["tax", "insurance", "loan", "other"]);

// 2. Base schema for shared fields
const DeductionBaseSchema = z.object({
  employee_payroll_id: z.string().uuid(),
  deduction_type: DeductionTypeEnum,
  amount: z.number().positive().min(0.01), // Ensures positive monetary value
  note: z.string().nullable().optional(),
});

// 3. Create Schema (for POST requests)
export const CreateDeductionSchema = DeductionBaseSchema.extend({
  // All fields required except note (optional/nullable)
  employee_payroll_id: z.string().uuid(),
  deduction_type: DeductionTypeEnum,
  amount: z.number().positive().min(0.01),
});

// 4. Update Schema (for PATCH requests)
export const UpdateDeductionSchema = DeductionBaseSchema.extend({
  // All fields optional
  employee_payroll_id: z.string().uuid().optional(),
  deduction_type: DeductionTypeEnum.optional(),
  amount: z.number().positive().min(0.01).optional(),
}).partial();

// 5. Response Schema (for GET requests)
export const DeductionSchema = DeductionBaseSchema.extend({
  id: z.string().uuid(),
  created_at: z.coerce.date(), // Handles ISO string -> Date conversion
});

// 6. TypeScript Types
export type DeductionType = z.infer<typeof DeductionTypeEnum>;
export type CreateDeduction = z.infer<typeof CreateDeductionSchema>;
export type UpdateDeduction = z.infer<typeof UpdateDeductionSchema>;
export type Deduction = z.infer<typeof DeductionSchema>;
