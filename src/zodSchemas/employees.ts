import { z } from "zod";

export const EmployeeSchema = z.object({
  date_employed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Date format YYYY-MM-DD
  date_of_birth: z.string().nullable().optional(), // Date of birth, nullable and optional
  first_name: z.string(), // Employee's first name
  last_name: z.string(), // Employee's last name
  created_by: z.string(),
  salary: z.number().optional(), // Numeric field for salary
  allowance: z.number().nullable().optional(), // Allowance, nullable and optional
  bank_account_number: z
    .string()
    .regex(/^\d{10}$/)
    .nullable()
    .optional(), // Bank account number, nullable and optional
  bank_name: z.string().nullable().optional(), // Bank name, nullable and optional
  bank_routing_number: z.string().nullable().optional(), // Bank routing number, nullable and optional
  bonus: z.number().nullable().optional(), // Bonus, nullable and optional
  city: z.string().nullable().optional(), // City, nullable and optional
  country: z.string().nullable().optional(), // Country, nullable and optional
  email: z.string().email().nullable().optional(), // Email, nullable and optional, must be a valid email format
  emergency_contact_name: z.string().nullable().optional(), // Emergency contact name, nullable and optional
  emergency_contact_phone: z.string().nullable().optional(), // Emergency contact phone, nullable and optional
  emergency_contact_relationship: z.string().nullable().optional(), // Emergency contact relationship, nullable and optional
  employment_status: z.string(), // Employment status, nullable and optional
  national_id: z.string().nullable().optional(), // National ID, nullable and optional
  payroll_type: z.enum(["salary", "allowance"]), // Enum for payroll type, nullable and optional
  performance_rating: z.number().nullable().optional(), // Performance rating, nullable and optional
  phone_number: z.string().regex(/^[0-9]{11}$/), // Phone number, nullable and optional
  postal_code: z.string().nullable().optional(), // Postal code, nullable and optional
  state: z.string().nullable().optional(), // State, nullable and optional
  status: z.string().nullable().optional(), // Status, nullable and optional
  supervisor_id: z.string().nullable().optional(), // Supervisor ID, nullable and optional
  updated_at: z.string().nullable().optional(), // Timestamp for last update, nullable and optional
});

export const UpdateEmployeeSchema = z.object({
  date_employed: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(), // Date format YYYY-MM-DD, optional
  date_of_birth: z.string().nullable().optional(), // Date of birth, nullable and optional
  first_name: z.string().optional(), // Employee's first name, optional
  last_name: z.string().optional(), // Employee's last name, optional
  created_by: z.string().optional(), // Created by, optional
  salary: z.number().optional(), // Numeric field for salary, optional
  allowance: z.number().nullable().optional(), // Allowance, nullable and optional
  bank_account_number: z
    .string()
    .regex(/^\d{10}$/)
    .nullable()
    .optional(), // Bank account number, nullable and optional
  bank_name: z.string().nullable().optional(), // Bank name, nullable and optional
  bank_routing_number: z.string().nullable().optional(), // Bank routing number, nullable and optional
  bonus: z.number().nullable().optional(), // Bonus, nullable and optional
  city: z.string().nullable().optional(), // City, nullable and optional
  country: z.string().nullable().optional(), // Country, nullable and optional
  email: z.string().email().nullable().optional(), // Email, nullable and optional, must be a valid email format
  emergency_contact_name: z.string().nullable().optional(), // Emergency contact name, nullable and optional
  emergency_contact_phone: z.string().nullable().optional(), // Emergency contact phone, nullable and optional
  emergency_contact_relationship: z.string().nullable().optional(), // Emergency contact relationship, nullable and optional
  employment_status: z.string().optional(), // Employment status, optional
  national_id: z.string().nullable().optional(), // National ID, nullable and optional
  payroll_type: z.enum(["salary", "allowance"]).optional(), // Enum for payroll type, optional
  performance_rating: z.number().nullable().optional(), // Performance rating, nullable and optional
  phone_number: z
    .string()
    .regex(/^[0-9]{11}$/)
    .optional(), // Phone number, optional
  postal_code: z.string().nullable().optional(), // Postal code, nullable and optional
  state: z.string().nullable().optional(), // State, nullable and optional
  status: z.string().nullable().optional(), // Status, nullable and optional
  supervisor_id: z.string().nullable().optional(), // Supervisor ID, nullable and optional
  updated_at: z.string().nullable().optional(), // Timestamp for last update, nullable and optional
});
