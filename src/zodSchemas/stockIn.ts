import { z } from "zod";

export const stockInSchema = z.object({
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
    )
    .optional(),
  item: z.string().refine((val) => val && val.length > 0, {
    message: "You must create a 'waste' inventory item",
  }),
  stocked_by: z.string(),
  warehouse: z.string(),
  quantity: z.number(),
  description: z.string().optional(),
});
