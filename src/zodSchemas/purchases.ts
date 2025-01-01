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
