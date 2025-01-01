import { z } from "zod";

export const InventoryItemSchema = z.object({
  code: z.string().regex(/^[A-Z0-9]{2}$/),
  name: z.string(),
  unit: z.string(),
  unit_price: z.number().optional().nullable(),
  purchase_cost: z.number(),
  type: z.enum(["raw", "product"]),
  description: z.string().optional().nullable(),
  image_path: z.string().optional().nullable(),
  image_public_url: z.string().optional().nullable(),
  sub_items: z
    .array(
      z.object({
        item: z.string(), // Text field for raw material item name
        quantity: z.number(), // Number field for quantity used
      })
    )
    .optional(),
  as_collection: z.boolean(),
});

export const UpdateInventoryItemSchema = z.object({
  id: z.string().uuid(),
  code: z
    .string()
    .regex(/^[A-Z0-9]{2}$/)
    .optional()
    .nullable(),
  name: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  unit_price: z.number().optional().nullable(),
  purchase_cost: z.number().optional().nullable(),
  type: z.enum(["raw", "product"]).optional().nullable(),
  description: z.string().optional().nullable(),
  image_path: z.string().optional().nullable(),
  image_public_url: z.string().optional().nullable(),
  sub_items: z
    .array(
      z.object({
        item: z.string(), // Text field for raw material item name
        quantity: z.number(), // Number field for quantity used
      })
    )
    .optional(),
  as_collection: z.boolean().optional(),
});
