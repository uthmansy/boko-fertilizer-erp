import { z } from "zod";

// Define the Zod schema
export const DispatchSchema = z.object({
  destination: z.string().optional(),
  is_inventory_transfer: z.boolean(),
  inventory_transfer_id: z.string().optional(),
  dispatched_by: z.string(),
  date_dispatched: z
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
  driver_name: z.string().optional(),
  transporter: z.string().optional(),
  driver_number: z
    .string()
    .refine((value) => /^\d{11}$/.test(value), {
      message: "Phone must be eleven digits and contain only numbers",
    })
    .optional(),
  external_origin_id: z.string().optional(),
  origin_state: z.string(),
  fee_paid: z.number().optional(),
  from_external_stock: z.boolean(),
  item: z.string(),
  sale_order_number: z.string().optional(),
  destination_address: z.string().optional(),
  origin_stock_id: z.string().optional(),
  other_waybill_number: z.string().optional(),
  paid_on_dispatch: z.number().optional(),
  paid_on_receive: z.number().optional(),
  qty_carried: z.number(),
  qty_received: z.number().optional(),
  received_by: z.string().optional(),
  shortage: z.number().optional(),
  status: z.enum(["dispatched", "delivered"]),
  to_customer: z.boolean(),
  transport_fee: z.number().optional(),
  type: z.enum(["normal", "sale"]),
  vehicle_number: z.string(),
  waybill_number: z.string().optional(),
});

export default DispatchSchema;
