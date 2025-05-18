import { z } from "zod";

export const CreateSaleRPCSchema = z
  .object({
    customer_id: z.string().uuid(),
    warehouse: z.string().optional(),
    type: z.enum(["external", "internal"]),
    paid: z.number().default(0),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date must be in the format YYYY-MM-DD",
    }),
    items: z
      .array(
        z.object({
          item_purchased: z.string().min(1),
          // Make purchase_item optional at first; we'll enforce required condition via refinement.
          purchase_item: z.string().optional(),
          price: z.number(),
          vat: z.number().default(7.5),
          quantity: z.number(),
        })
      )
      .min(1, "At least one item is required"),
  })
  .superRefine((data, ctx) => {
    // Only enforce purchase_item presence if type is external.
    if (data.type === "external") {
      data.items.forEach((item, index) => {
        if (!item.purchase_item) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "purchase_item is required for external type",
            path: ["items", index, "purchase_item"],
          });
        }
      });
    }
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
  customer_id: z.string().uuid(),
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
  customer_id: z.string().uuid().optional().nullable(),
});
