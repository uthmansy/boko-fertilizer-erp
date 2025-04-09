import { z } from "zod";

const VehicleItemSchema = z.object({
  id: z.string().uuid(),
  qty_received: z.number().optional(),
});

// Define the Zod schema
export const ReceiveSchema = z.object({
  date_received: z
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
    )
    .optional(),
  paid_on_receive: z.number(),
  received_by: z.string(),
  status: z.enum(["received"]),
  id: z.string().uuid(),
  items: z
    .array(VehicleItemSchema)
    .min(1, { message: "At least one item is required" })
    .default([]),
});

export default ReceiveSchema;
export type ReceiveVehicles = z.infer<typeof ReceiveSchema>;
