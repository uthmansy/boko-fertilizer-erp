import { ExternalStockItems, FieldConfig, SelectOption } from "../types/comps";
import { App } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodError } from "zod";
import {
  addSale,
  getExternalStocks,
  getInventoryItems,
  getWarehouses,
} from "../helpers/apiFunctions"; // Update to use addSale function
import {
  externalStocksKeys,
  inventoryItemsKeys,
  warehousesKeys,
} from "../constants/QUERY_KEYS"; // Update to use salesKeys
import { SalesSchema } from "../zodSchemas/sales"; // Update to SalesSchema
import useSalesStore from "../store/sales";
import { useEffect, useState } from "react";
import { StocksWithSoldBalance } from "../types/db";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

function useAddNewSale(): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [externalStocksItems, setExternalStocksItems] = useState<
    ExternalStockItems[]
  >([]);
  const [externalStocksOptions, setExternalStocksOptions] = useState<
    SelectOption[]
  >([]);

  const { data: items } = useQuery({
    queryKey: inventoryItemsKeys.getAllItems,
    queryFn: async (): Promise<SelectOption[]> => {
      const items = await getInventoryItems();
      return items.map((item) => ({ label: item.name, value: item.name }));
    },
    onError: () => {
      message.error("Failed to Load Inventory Items");
    },
  });

  const { data: warehouses } = useQuery({
    queryKey: warehousesKeys.getAllWarehouses,
    queryFn: async (): Promise<SelectOption[]> => {
      const warehouses = await getWarehouses();
      return warehouses.map((warehouse) => ({
        label: warehouse.name,
        value: warehouse.name,
      }));
    },
    onError: () => {
      message.error("Failed to Load warehouses");
    },
  });

  const { data: externalStocks } = useQuery({
    queryKey: externalStocksKeys.getItemExternalRecord,
    queryFn: async (): Promise<StocksWithSoldBalance[]> => {
      const stocks = await getExternalStocks();
      const stocksWithSoldBalance: StocksWithSoldBalance[] = stocks
        .map((stock) => {
          const totalSoldBalance = stock.sales.reduce(
            (sum, sale) => sum + sale.balance,
            0
          );
          return {
            ...stock,
            totalSoldBalance,
          };
        })
        .filter((stock) => stock.balance > stock.totalSoldBalance);
      return stocksWithSoldBalance;
    },
    onError: () => {
      message.error("Failed to Load Inventory Stocks");
    },
  });

  useEffect(() => {
    externalStocks &&
      setExternalStocksItems(
        externalStocks.map((stock) => ({
          stockId: stock.id,
          item: stock.stock_purchases.item,
        }))
      );
    externalStocks &&
      setExternalStocksOptions(
        externalStocks.map((stock) => ({
          label: `${stock.stock_purchases.item} / ${
            stock.stock_purchases.seller
          } - (${stock.balance - stock.totalSoldBalance}  Available)`,
          value: stock.id,
        }))
      );
  }, [externalStocks]);

  const { type, isModalOpen, handleCloseModal, handleOpenModal, resetState } =
    useSalesStore();

  const formConfig: FieldConfig[] = [
    {
      name: "date",
      label: "Date",
      type: "date",
      required: true,
    },
    ...((type === "internal"
      ? [
          {
            name: "item_purchased",
            label: "Item Purchased",
            type: "select",
            options: items || [],
            required: true,
          },
        ]
      : []) as FieldConfig[]),
    {
      name: "price",
      label: "Price",
      type: "money",
      required: true,
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      // suffix: "",
      required: true,
      dependencies: ["external_stock"],
      getMaxFromDependency: (values) => {
        if (type === "external") {
          const externalStock = externalStocks?.find(
            (stock) => stock.id === values?.external_stock
          );
          const balance = externalStock && externalStock.balance;

          return balance;
        }
      },
    },
    {
      name: "customer_name",
      label: "Customer Name",
      type: "text",
      required: true,
    },
    {
      name: "customer_phone",
      label: "Customer Phone",
      type: "text",
      required: false,
      rules: [
        {
          pattern: /^[0-9]{11}$/,
          message: "Phone Number must be 11 digits and contain numbers only",
        },
      ],
    },
    ...((type === "internal"
      ? [
          {
            name: "warehouse",
            label: "Warehouse",
            type: "select",
            options: warehouses,
            required: true,
          },
        ]
      : []) as FieldConfig[]),
    ...((type === "external"
      ? [
          {
            name: "external_stock",
            label: "External Stock",
            type: "select",
            options: externalStocksOptions,
            required: true,
          },
        ]
      : []) as FieldConfig[]),
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        values.date = values.date.format("YYYY-MM-DD");
        values.type = type;
        values.balance = values.quantity;
        values.payment_balance = values.price;
        if (type === "external") {
          const externalStock = externalStocks?.find(
            (stock) => stock.id === values?.external_stock
          );
          if (
            externalStock &&
            externalStock.balance -
              (externalStock.totalSoldBalance + values.quantity) <
              0
          )
            throw new Error("Not Enough Inventory");
          values.item_purchased = externalStocksItems?.find(
            (item) => item.stockId === values.external_stock
          )?.item;
        }

        await SalesSchema.parseAsync(values);
        await addSale(values); // Use addSale function for sales
      } catch (error) {
        if (error instanceof ZodError) {
          // Handle ZodError separately to extract and display validation errors
          console.error("Zod Validation failed:", error.errors);
          throw error; // Re-throw the ZodError to be caught by the onError handler
        } else if (error instanceof Error) {
          // Handle other types of errors
          console.error("An unexpected error occurred:", error.message);
          throw new Error(error.message);
        } else {
          console.error("An unexpected error occurred:", error);
          throw new Error("An unexpected error occurred");
        }
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("An unexpected error occurred");
      }
    },
    onSuccess: () => {
      message.success("Sale added successfully");
      handleCloseModal();
      resetState();
      queryClient.invalidateQueries(); // Update to use salesKeys
    },
  });

  return {
    isModalOpen,
    handleCloseModal,
    handleOpenModal,
    formConfig,
    handleSubmit,
    isLoading,
  };
}

export default useAddNewSale;
