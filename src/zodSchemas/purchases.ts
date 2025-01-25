import { z } from "zod";

export const PurchasesSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine(
      (date) => {
        const parsedDate = Date.parse(date);
        return !isNaN(parsedDate);
      },
      {
        message: "Date must be in the format YYYY-MM-DD",
      }
    ),
  item: z.string().nullable(),
  price: z.number(),
  quantity: z.number(),
  seller: z.string(),
});

export const UpdatePurchaseSchema = z.object({
  id: z.string().uuid({
    message: "Invalid UUID format",
  }),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date value")
    .optional()
    .nullable(),
  seller: z.string().optional().nullable(),
  price: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
});
