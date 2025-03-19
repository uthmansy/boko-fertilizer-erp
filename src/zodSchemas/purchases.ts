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
  seller: z.string(),
  items: z
    .array(
      z.object({
        item: z.string(),
        price: z.number(),
        quantity: z.number(),
      })
    )
    .min(1, "At least one item is required"),
});

export type CreatePurchase = z.infer<typeof PurchasesSchema>;

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
});
