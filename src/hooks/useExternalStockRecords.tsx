import { useQuery, useQueryClient } from "react-query";
import {
  inventoryItemsKeys,
  externalStocksKeys,
} from "../constants/QUERY_KEYS";
import { App, DescriptionsProps } from "antd";
import { getItemExternalRecord, getItemsNames } from "../helpers/apiFunctions";
import { useEffect, useState } from "react";
import { ExternalStocksAndPurchases } from "../types/db";
import {
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
  handleItemSearch: (value: any) => void;
  resetFilters: (value: any) => void;
}

function useExternalStockRecordss(): HookReturn {
  const { message } = App.useApp();
  const [item, setItem] = useState("");
  const [searchByName, setSearchByName] = useState<string | null>();
  const queryClient = useQueryClient();

  const handleItem = (item: string) => setItem(item);

  const handleItemSearch = (value: any) => {
    setSearchByName(value.target.value);
  };

  const resetFilters = () => {
    setSearchByName(null);
    queryClient.invalidateQueries(inventoryItemsKeys.getItemsNamesExternal);
  };

  const { data: items } = useQuery({
    queryKey: [inventoryItemsKeys.getItemsNamesExternal, searchByName],
    queryFn: async (): Promise<string[]> => {
      const items = await getItemsNames(searchByName);
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
          <div className="">
            <span>
              {formatNumber(record.balance || 0)}{" "}
              {record.purchase_item.item.unit}
            </span>
            {/* <span className="w-1/2">
              {formatNumber(bagsToTons(record.balance || 0))} MTS
            </span> */}
          </div>
        ),
      },
      {
        key: "3",
        label: "Item",
        children: record.purchase_item.item.name,
      },
      {
        key: "4",
        label: "Dispatched",
        children: (
          <div className="">
            <span>
              {formatNumber(record.dispatched || 0)}{" "}
              {record.purchase_item.item.unit}
            </span>
            {/* <span className="w-1/2">
              {formatNumber(bagsToTons(record.dispatched || 0))} MTS
            </span> */}
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
    handleItemSearch,
    resetFilters,
  };
}

export default useExternalStockRecordss;
