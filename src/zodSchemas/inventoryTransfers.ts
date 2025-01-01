import { z } from "zod";

export const InventoryTransferSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Ensures date format is YYYY-MM-DD
  created_by: z.string(), // Text field for the user who created the transfer
  item: z.string(), // Simple string for item name
  origin_stock_id: z.string().uuid(), // UUID for the origin stock
  destination_stock_id: z.string().uuid(), // UUID for the destination stock
  quantity: z.number().positive(), // Number field for the quantity, must be positive
  balance: z.number(), // Number field for the balance
});
