import { z } from "zod";

export const CreateSaleRPCSchema = z.object({
  customer_name: z.string(),
  warehouse: z.string().optional(),
  type: z.enum(["external", "internal"]),
  customer_phone: z.string().optional(),
  paid: z.number().default(0),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Date must be in the format YYYY-MM-DD",
  }),
  items: z
    .array(
      z.object({
        item_purchased: z.string(),
        price: z.number(),
        vat: z.number().default(7.5),
        quantity: z.number(),
      })
    )
    .min(1, "At least one item is required"),
});

export type CreateSaleType = z.infer<typeof CreateSaleRPCSchema>;

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

export const UpdateSaleSchema = z.object({
  id: z.string().uuid({
    message: "Invalid UUID format",
  }),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date value")
    .optional()
    .nullable(),
  customer_name: z
    .string()
    .min(3, "Customer name must be at least 3 characters")
    .max(50, "Customer name cannot exceed 50 characters")
    .optional()
    .nullable(),
  customer_phone: z.string().optional().nullable(),
});
