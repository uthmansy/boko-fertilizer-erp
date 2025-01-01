export interface LoginPayload {
  email: string;
  password: string;
}

export type FinancialReport = {
  year_month: string; // Format: YYYY-MM
  total_sales: number; // Total sales amount for the month
  profit: number; // Profit = total_sales - total_purchases
  total_expenses: number;
  total_item_cost: number;
  total_payroll: number;
};
