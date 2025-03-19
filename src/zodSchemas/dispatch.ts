import { z } from "zod";

// Schema for a single vehicle item (vehicle_items table)
const VehicleItemSchema = z.object({
  item: z.string(),
  qty_carried: z.number(),
  qty_received: z.number().optional(),
  received_by: z.string().optional(),
  shortage: z.number().optional().default(0),
  // Assuming destination is a UUID in string form; adjust if needed
  destination: z.string().optional(),
  status: z.enum(["dispatched", "delivered"]).default("dispatched"),
  // Adjust dispatch_type if needed – original function casts to a type with default 'purchase'
  dispatch_type: z.enum(["purchase", "sale", "transfer"]).default("purchase"),
  sale_item: z.string().optional(),
  purchase_item: z.string().optional(),
  transfer_id: z.string().optional(),
  date_received: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date must be in the format YYYY-MM-DD",
    })
    .optional(),
});

// Schema for the overall dispatch (vehicles table)
export const DispatchSchema = z.object({
  v_date_dispatched: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Date must be in the format YYYY-MM-DD",
  }),
  v_vehicle_number: z.string(),
  v_sale_order_number: z.string().optional().nullable(),
  v_status: z.string(),
  v_dispatched_by: z.string(),
  v_destination: z.string().uuid().optional(),
  v_driver_name: z.string().optional(),
  v_driver_number: z
    .string()
    .optional()
    .refine((value) => !value || /^\d{11}$/.test(value), {
      message: "Phone must be eleven digits and contain only numbers",
    }),
  v_transport_fee: z.number().optional(),
  v_fee_paid: z.number().optional(),
  v_paid_on_dispatch: z.number().optional(),
  v_paid_on_receive: z.number().optional(),
  v_other_waybill_number: z.string().optional(),
  v_transporter: z.string().optional(),
  v_date_received: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date must be in the format YYYY-MM-DD",
    })
    .optional(),
  v_destination_address: z.string().optional(),
  v_origin_state: z.string().optional(), // if using enum, you might replace z.string() with z.enum([...])

  // An array of vehicle items
  items: z
    .array(VehicleItemSchema)
    .min(1, { message: "At least one item is required" })
    .default([]),
});

export type CreateDispatch = z.infer<typeof DispatchSchema>;
