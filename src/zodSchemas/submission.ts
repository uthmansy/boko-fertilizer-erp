import { z } from "zod";

export const ProductSubmissionSchema = z.object({
  date_submitted: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Ensures date format is YYYY-MM-DD
  product: z.string(), // Text field for product name
  quantity: z.number().positive(), // Positive integer for quantity
  submitted_by: z.string(), // Text field for submitted by
  warehouse: z.string(), // Text field for warehouse
  shift: z.string(), // Text field for warehouse
});

export const MultiProductSubmissionSchema = z.object({
  date_submitted: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  submitted_by: z.string(),
  warehouse: z.string(),
  shift: z.string(),
  products: z.array(
    z.object({
      product: z.string(),
      quantity: z.number().positive(),
    })
  ),
});
