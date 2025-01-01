import { z } from "zod";

// Define the Zod schema
export const userSignUpSchema = z.object({
  email: z.string().email("Invalid email address"), // Validates that the email is a valid email address
  password: z.string().min(6, "Password must be 6 or more characters long"), // Validates that the password is at least 6 characters long
  userData: z.object({
    full_name: z.string().min(1, "Full name is required"), // Validates that the full name is not empty
    role: z.string().min(1, "Role is required"), // Validates that the role is not empty
    warehouse: z.string().min(1, "Warehouse is required"), // Validates that the warehouse is not empty
    username: z.string().min(1, "Warehouse is required"), // Validates that the warehouse is not empty
  }),
});
