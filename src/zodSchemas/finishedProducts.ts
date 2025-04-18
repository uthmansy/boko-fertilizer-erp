import { z } from "zod";

export const finishedProductsSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Ensures date format is YYYY-MM-DD
  product: z.string(), // Text field for the finished product
  quantity_produced: z.number(), // Number field for quantity produced
  added_by: z.string(), // Text field for produced by
  warehouse: z.string(), // Text field for the warehouse
  shift: z.string(), // Text field for the warehouse
  waste: z.number(), // Text field for the warehouse
});

export const UpdateFinishedProductsSchema = z.object({
  id: z.string().uuid({
    message: "Invalid UUID format",
  }),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .nullable(), // Ensures date format is YYYY-MM-DD
  product: z.string().optional().nullable(), // Text field for the finished product
  quantity_produced: z.number().optional().nullable(), // Number field for quantity produced
  added_by: z.string().optional().nullable(), // Text field for produced by
  warehouse: z.string().optional().nullable(), // Text field for the warehouse
  shift: z.string().optional().nullable(), // Text field for the warehouse
  waste: z.number().optional().nullable(), // Text field for the warehouse
});

export type UpdateFinishedProductsType = z.infer<
  typeof UpdateFinishedProductsSchema
>;

export const finishedProductsMultipleSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Ensures date format is YYYY-MM-DD
  added_by: z.string(), // Text field for produced by
  warehouse: z.string(), // Text field for the warehouse
  shift: z.string(), // Text field for the shift
  // Array of products with their production details
  products: z.array(
    z.object({
      product: z.string(), // Name of the finished product
      quantity_produced: z.number(), // Quantity produced for this product
      waste: z.number(), // Waste generated for this product
    })
  ),
});
