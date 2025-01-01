import { useQuery } from "react-query";
import {
  inventoryItemsKeys,
  externalStocksKeys,
} from "../constants/QUERY_KEYS";
import { App, DescriptionsProps } from "antd";
import { getItemExternalRecord, getItemsNames } from "../helpers/apiFunctions";
import { useEffect, useState } from "react";
import { ExternalStocksAndPurchases } from "../types/db";
import {
  bagsToTons,
  formatDateString,
  formatNumber,
  getDayFromDate,
} from "../helpers/functions";

interface HookReturn {
  items: string[];
  tableItems: DescriptionsProps["items"][];
  handleItem: (item: string) => void;
  records: ExternalStocksAndPurchases[] | undefined;
  isLoading: boolean;
}

function useExternalStockRecordss(): HookReturn {
  const { message } = App.useApp();
  const [item, setItem] = useState("");

  const handleItem = (item: string) => setItem(item);

  const { data: items } = useQuery({
    queryKey: inventoryItemsKeys.getItemsNames,
    queryFn: async (): Promise<string[]> => {
      const items = await getItemsNames();
      return items.map((item) => item.name);
    },
    onError: () => {
      message.error("Failed to Load Items Names");
    },
  });

  const { data: records, isLoading } = useQuery({
    queryKey: [externalStocksKeys.getItemExternalRecord, item],
    queryFn: async (): Promise<ExternalStocksAndPurchases[]> => {
      const records = await getItemExternalRecord(item);
      return records;
    },
    onError: () => {
      message.error("Failed to Load Item");
    },
  });

  useEffect(() => {
    if (items && items.length > 0) {
      handleItem(items[0]);
    }
  }, [items]);

  const tableItems: DescriptionsProps["items"][] =
    records?.map((record) => [
      {
        key: "1",
        label: "Seller",
        children: record.stock_purchases.seller,
      },
      {
        key: "2",
        label: "Balance",
        children: (
          <div className="flex">
            <span className="w-1/2">
              {formatNumber(record.balance || 0)} BAGS
            </span>
            <span className="w-1/2">
              {formatNumber(bagsToTons(record.balance || 0))} MTS
            </span>
          </div>
        ),
      },
      {
        key: "3",
        label: "Item",
        children: record.stock_purchases.item,
      },
      {
        key: "4",
        label: "Dispatched",
        children: (
          <div className="flex">
            <span className="w-1/2">
              {formatNumber(record.dispatched || 0)} BAGS
            </span>
            <span className="w-1/2">
              {formatNumber(bagsToTons(record.dispatched || 0))} MTS
            </span>
          </div>
        ),
      },
      {
        key: "5",
        label: "Date",
        children: `${getDayFromDate(record.stock_purchases.date)} ${
          formatDateString(record.stock_purchases.date) || "Invalid Date"
        }`,
      },
      {
        key: "6",
        label: "Order Number",
        children: record.order_number,
      },
    ]) || [];

  return {
    items: items || [],
    tableItems,
    handleItem,
    isLoading,
    records,
  };
}

export default useExternalStockRecordss;
