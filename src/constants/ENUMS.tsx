import {
  DispatchTypes,
  EmploymentStatus,
  ExpenseCategories,
  InventoryItemType,
  PaymentMode,
  SalesType,
  Shifts,
  States,
  UserRole,
} from "../types/db";

export const STATES: States[] = [
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
];

export const INVENTORY_ITEM_TYPE: InventoryItemType[] = ["product", "raw"];
export const PAYMENT_MODE: PaymentMode[] = ["cash", "transfer", "pos"];
export const SALES_TYPE: SalesType[] = ["internal", "external"];
export const EMPLOYMENT_STATUS: EmploymentStatus[] = ["active", "not_active"];
export const EXPENSE_CATEGORY: ExpenseCategories[] = [
  "Payroll",
  "Office Supplies",
  "Utilities",
  "Rent",
  "Travel",
  "Marketing",
  "Legal and Professional Services",
  "Insurance",
  "Technology",
  "Maintenance and Repairs",
  "Employee Benefits",
  "Training and Development",
  "Entertainment",
  "Transportation",
  "Medical",
  "Government Agencies",
  "Miscellaneous",
];
export const USER_ROLE: UserRole[] = [
  "SUPER ADMIN",
  "DEFAULT",
  "ADMIN",
  "INVENTORY",
  "PRODUCTION",
  "MANAGER",
  "ACCOUNTING",
  "LOGISTICS",
];

export const SHIFTS: Shifts[] = ["morning", "night"];
export const DISPATCH_TYPES: DispatchTypes[] = ["purchase", "sale", "transfer"];

export const MONTHS: string[] = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
