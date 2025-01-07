import { z } from "zod";

// Define the Zod schema for payment accounts
const PaymentAccountSchema = z.object({
  alias: z.string(), // Text, can be null if the user is removed
  added_by: z.string(), // Text, can be null if the user is removed
  bank_name: z.string(), // Required text field for the bank name
  account_number: z.string(), // Required and unique account number
  account_name: z.string(), // Required text field for the account name
});

export default PaymentAccountSchema;
