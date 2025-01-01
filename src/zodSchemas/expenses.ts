import { z } from "zod";

// Define the Zod schema for expenses
const ExpenseSchema = z.object({
  category: z.string().min(1, "Expense Category is required"), // Required field for expense category
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

export default ExpenseSchema;
