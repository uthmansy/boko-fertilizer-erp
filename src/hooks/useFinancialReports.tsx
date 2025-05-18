import { useQuery } from "react-query";
import { App } from "antd";
import { financialReportsKeys } from "../constants/QUERY_KEYS"; // Update to sales query keys
import { getMonthlyFinancialReprots } from "../helpers/apiFunctions";
import { Headers } from "react-csv/lib/core";
import { FinancialReportLedger } from "../types/db";

interface HookReturn {
  sortedAscendingReports: FinancialReportLedger[]; // Update to Sales array
  isLoading: boolean;
  isError: boolean;
  isRefetching: boolean;
  csvHeaders: Headers;
  sortedDescendingReports: FinancialReportLedger[];
}

function useFinancialReports(): HookReturn {
  // Updated hook name
  const { message } = App.useApp();

  const csvHeaders: Headers = [
    { label: "Month", key: "month" },
    { label: "Year", key: "year" },
    { label: "Revenue", key: "total_revenue" },
    { label: "Cost of goods", key: "total_cost_of_used" },
    { label: "Payroll", key: "total_payroll" },
    { label: "Total Expenses", key: "total_expenses" },
    { label: "Profit", key: "profit" },
  ];

  const { data, isLoading, isRefetching, isError } = useQuery(
    financialReportsKeys.getAll,
    {
      queryFn: async () => {
        const reports = await getMonthlyFinancialReprots();
        return reports;
      },
      onError: () => {
        message.error("Error Generating REport");
      },
    }
  );

  const sortedAscendingReports = [
    ...(data?.sort((a, b) => {
      // Safely extract year/month with defaults
      const yearA = a.year ?? -Infinity; // Treat missing years as very old
      const yearB = b.year ?? -Infinity;
      const monthA = a.month ?? -Infinity; // Treat missing months as very old
      const monthB = b.month ?? -Infinity;

      if (yearA !== yearB) {
        return yearA - yearB;
      }

      return monthA - monthB;
    }) || []),
  ];

  const sortedDescendingReports =
    data?.sort((a, b) => {
      // Safely extract year/month with defaults
      const yearA = a.year ?? -Infinity; // Treat missing years as very old
      const yearB = b.year ?? -Infinity;
      const monthA = a.month ?? -Infinity; // Treat missing months as very old
      const monthB = b.month ?? -Infinity;

      if (yearA !== yearB) {
        return yearB - yearA;
      }

      return monthB - monthA;
    }) || [];

  return {
    sortedAscendingReports,
    sortedDescendingReports,
    isLoading,
    isRefetching,
    csvHeaders,
    isError,
  };
}

export default useFinancialReports; // Export updated hook name
