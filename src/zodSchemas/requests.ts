import { z } from "zod";

export const RequestSchema = z.object({
  date_requested: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Ensures date format is YYYY-MM-DD
  requested_by: z.string(), // Text field for requested by
  warehouse: z.string(), // Text field for requested by
  items: z.array(
    z.object({
      item: z.string(), // Text field for item name
      quantity: z.number(), // Number field for quantity
    })
  ),
});
