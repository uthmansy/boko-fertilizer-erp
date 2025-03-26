import { z } from "zod";

// 1. Define enums to match PostgreSQL types
export const BonusType = z.enum([
  "performance",
  "referral",
  "holiday",
  "signing",
  "other",
]);
export type BonusType = z.infer<typeof BonusType>;

// 2. Base bonus schema
export const PayrollBonusSchema = z.object({
  id: z.string().uuid().describe("Automatically generated UUID"),
  created_at: z.coerce.date().describe("Auto-generated creation timestamp"),
  employee_payroll_id: z
    .string()
    .uuid()
    .describe("Reference to employee payroll record"),
  bonus_type: BonusType.describe("Type of bonus being applied"),
  amount: z.number().positive().describe("Bonus amount (positive number)"),
  note: z
    .string()
    .nullable()
    .optional()
    .describe("Optional notes about the bonus"),
});

// 3. Create bonus schema (for POST requests)
export const CreatePayrollBonusSchema = PayrollBonusSchema.omit({
  id: true,
  created_at: true,
}).extend({
  amount: z.number().positive().max(1000000, "Amount too large"),
  note: z.string().optional().nullable().default(null),
});

// 4. Update bonus schema (for PATCH requests)
export const UpdatePayrollBonusSchema = CreatePayrollBonusSchema.partial();

// 5. Related schemas for API responses
export const PayrollBonusResponseSchema = PayrollBonusSchema.extend({
  net_impact: z.number().describe("Calculated net impact on payroll"),
});

// Type exports
export type PayrollBonus = z.infer<typeof PayrollBonusSchema>;
export type CreatePayrollBonus = z.infer<typeof CreatePayrollBonusSchema>;
export type UpdatePayrollBonus = z.infer<typeof UpdatePayrollBonusSchema>;
export type PayrollBonusResponse = z.infer<typeof PayrollBonusResponseSchema>;
