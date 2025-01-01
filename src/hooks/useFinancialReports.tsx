import { useQuery } from "react-query";
import { App } from "antd";
import { financialReportsKeys } from "../constants/QUERY_KEYS"; // Update to sales query keys
import { FinancialReport } from "../types/api";
import { getMonthlyFinancialReprots } from "../helpers/apiFunctions";
import { Headers } from "react-csv/lib/core";

interface HookReturn {
  reports: FinancialReport[]; // Update to Sales array
  isLoading: boolean;
  isRefetching: boolean;
  csvHeaders: Headers;
}

function useFinancialReports(): HookReturn {
  // Updated hook name
  const { message } = App.useApp();

  const csvHeaders: Headers = [
    { label: "Month", key: "year_month" },
    { label: "Revenue", key: "total_sales" },
    { label: "Cost of goods", key: "total_item_cost" },
    { label: "Payroll", key: "total_payroll" },
    { label: "Total Expenses", key: "total_expenses" },
    { label: "Profit", key: "profit" },
  ];

  const { data, isLoading, isRefetching } = useQuery(
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

  return {
    reports: data || [], // Update to Sales array
    isLoading,
    isRefetching,
    csvHeaders,
  };
}

export default useFinancialReports; // Export updated hook name
