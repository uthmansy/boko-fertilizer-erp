import { z } from "zod";

// Define the Zod schema for expenses
const ExpenseSchema = z.object({
  category: z.string().min(1, "Expense Category is required"), // Required field for expense category
  warehouse: z.string().min(1, "Warehouse is required"), // Required field for expense category
  amount: z.number().positive("Amount must be a positive number"), // Required field for amount with positive value
  payment_method: z.string().optional(), // Optional field for payment method
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format YYYY-MM-DD"), // Required field for date
  beneficiary: z.string().optional(), // Optional field for beneficiary
  invoice_number: z.string().optional(), // Optional field for invoice number
  description: z.string().min(1, "Description is required"), // Required field for description
  notes: z.string().optional(), // Optional field for notes
  created_by: z.string(), // Optional field for notes
});

export const UpdateExpenseSchema = z
  .object({
    id: z.string().uuid({
      message: "Invalid UUID format",
    }),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
      .refine((date) => !isNaN(Date.parse(date)), "Invalid date value")
      .optional()
      .nullable(),
    amount: z
      .number()
      .positive("Amount must be greater than 0")
      .optional()
      .nullable(),
    category: z.string().optional().nullable(),
    payment_method: z.string().optional().nullable(),
    description: z.string().max(255).optional().nullable(),
    notes: z.string().max(1000).optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.date) {
        const today = new Date();
        const saleDate = new Date(data.date);
        return saleDate <= today;
      }
      return true;
    },
    {
      message: "Sale date cannot be in the future",
      path: ["date"],
    }
  );

export default ExpenseSchema;
