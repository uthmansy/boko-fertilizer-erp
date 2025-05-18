import { z } from "zod";

export const AddCustomerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").optional().nullable(),
  phone: z
    .string()
    .regex(/^[0-9]{11}$/, "Phone number must be exactly 11 digits")
    .optional()
    .nullable(),
});
