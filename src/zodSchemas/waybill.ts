import { z } from "zod";

export const WaybillNumberSchema = z
  .string()
  .regex(/^[A-Z]{3}-[A-Z]{3}-\d{2}-\d{6}$/, {
    message: "Invalid Waybill",
  });
