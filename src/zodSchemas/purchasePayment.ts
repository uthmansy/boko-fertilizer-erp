import { z } from "zod";

const paymentModeEnum = z.enum(["cash", "transfer", "pos"]);

export const PurchasePaymentSchema = z.object({
  account_name: z.string().nullable().optional(),
  account_number: z.string().nullable().optional(),
  amount: z.number(),
  bank_name: z.string().nullable().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  order_number: z.string(),
  payment_mode: paymentModeEnum,
  payment_ref: z.string().nullable().optional(),
});
