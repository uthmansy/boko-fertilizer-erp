import { z } from "zod";

// Define the Zod schema
const WarehouseSchema = z.object({
  address: z.string(),
  code: z.string().refine((value) => /^[A-Z]{3}$/.test(value), {
    message: "Code must be a 3-letter uppercase string",
  }),
  location: z.enum([
    "abia",
    "adamawa",
    "akwa ibom",
    "anambra",
    "bauchi",
    "bayelsa",
    "benue",
    "borno",
    "cross river",
    "delta",
    "ebonyi",
    "edo",
    "ekiti",
    "enugu",
    "gombe",
    "imo",
    "jigawa",
    "kaduna",
    "kano",
    "katsina",
    "kebbi",
    "kogi",
    "kwara",
    "lagos",
    "nasarawa",
    "niger",
    "ogun",
    "ondo",
    "osun",
    "oyo",
    "plateau",
    "rivers",
    "sokoto",
    "taraba",
    "yobe",
    "zamfara",
    "abuja",
  ]),
  name: z.string(),
  stock_receiver_phone: z.string().refine((value) => /^\d{11}$/.test(value), {
    message:
      "Stock receiver phone must be eleven digits and contain only numbers",
  }),
});

export default WarehouseSchema;
