import { z } from "zod";

export const SalesSchema = z.object({
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
  item_purchased: z.string(),
  price: z.number(),
  vat: z.number(),
  quantity: z.number(),
  balance: z.number(),
  payment_balance: z.number(),
  customer_name: z.string(),
  customer_phone: z.string().optional(),
  warehouse: z.string().optional(),
  external_stock: z.string().optional(),
  type: z.enum(["external", "internal"]),
});
