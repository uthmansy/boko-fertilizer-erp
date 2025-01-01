import { App } from "antd";
import { Headers } from "react-csv/lib/core";
import { useQuery } from "react-query";
import { salesKeys } from "../constants/QUERY_KEYS";
import { getSalesCsvData } from "../helpers/apiFunctions";
import { Sales } from "../types/db";

interface HookReturn {
  data: Sales[] | undefined;
  headers: Headers;
}
function useSalesCsv(): HookReturn {
  const { message } = App.useApp();

  const headers: Headers = [
    { label: "Date", key: "date" },
    { label: "Customer", key: "customer_name" },
    { label: "Customer Phone", key: "customer_phone" },
    { label: "Item", key: "item_purchased" },
    { label: "Quantity", key: "quantity" },
    { label: "Quantity Taken", key: "quantity_taken" },
    { label: "Quantity Balance", key: "balance" },
    { label: "Price", key: "price" },
    { label: "Paid", key: "paid" },
    { label: "Payment Balance", key: "payment_balance" },
    { label: "Warehouse", key: "warehouse" },
    { label: "Sale Type", key: "type" },
  ];

  const { data } = useQuery(salesKeys.getCsvData, {
    queryFn: getSalesCsvData,
    onError: () => {
      message.error("Error getting Csv Data");
    },
  });

  return { data, headers };
}

export default useSalesCsv;
