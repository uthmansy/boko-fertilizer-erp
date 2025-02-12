import { z } from "zod";

export const WaybillNumberSchema = z
  .string()
  .regex(/^[A-Za-z0-9]{3}-[A-Za-z0-9]{3}-[A-Za-z0-9]{2}-[A-Za-z0-9]{6}$/, {
    message: "Invalid Waybill",
  });
