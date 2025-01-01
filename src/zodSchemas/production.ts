import { z } from "zod";

export const ProductionSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Ensures date format is YYYY-MM-DD
  product: z.string(), // Text field for the finished product
  quantity_produced: z.number(), // Number field for quantity produced
  produced_by: z.string(), // Text field for produced by
  warehouse: z.string(), // Text field for the warehouse
  shift: z.string(), // Text field for the warehouse
  waste: z.number(), // Text field for the warehouse
  items: z.array(
    z.object({
      item: z.string(), // Text field for raw material item name
      quantity: z.number(), // Number field for quantity used
    })
  ),
});
