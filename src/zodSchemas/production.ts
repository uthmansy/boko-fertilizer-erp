import { z } from "zod";

export const ProductionSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Ensures date format is YYYY-MM-DD
  product: z.string(), // Text field for the finished product
  quantity_produced: z.number(), // Number field for quantity produced
  produced_by: z.string(), // Text field for produced by
  warehouse: z.string(), // Text field for the warehouse
  shift: z.string(), // Text field for the warehouse
  items: z.array(
    z.object({
      item: z.string(), // Text field for raw material item name
      quantity: z.number(), // Number field for quantity used
    })
  ),
});

export const ProductionMultipleProductsSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Ensures date format is YYYY-MM-DD
  produced_by: z.string(), // Text field for produced by
  warehouse: z.string(), // Text field for the warehouse
  shift: z.string(), // Text field for the shift
  // Array of products with their production details
  products: z.array(
    z.object({
      product: z.string(), // Name of the finished product
      quantity_produced: z.number(), // Quantity produced for this product
    })
  ),
});
