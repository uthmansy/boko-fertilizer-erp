import { z } from "zod";

export const UpdateSaleItemSchema = z.object({
  id: z.string().uuid({
    message: "Invalid UUID format",
  }),

  price: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
});
