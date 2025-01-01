import { useState } from "react";
import { FieldConfig, SelectOption } from "../types/comps";
import { App } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodError } from "zod";
import {
  inventoryItemsKeys,
  stocksKeys,
  warehousesKeys,
} from "../constants/QUERY_KEYS";
import { InventoryTransferSchema } from "../zodSchemas/inventoryTransfers";
import {
  addInventoryTransfer,
  getAllInternalStocks,
  getInventoryItems,
  getWarehouses,
} from "../helpers/apiFunctions";
import useAuthStore from "../store/auth";
import { Stocks } from "../types/db";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

function useAddNewInventoryTransfer(): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  const { data: stocks } = useQuery({
    queryKey: stocksKeys.getInternalStocks,
    queryFn: async (): Promise<Stocks[]> => {
      const stocks = await getAllInternalStocks();
      return stocks;
    },
    onError: () => {
      message.error("Failed to Load Inventory");
    },
  });

  const { data: warehouses } = useQuery({
    queryKey: warehousesKeys.getDispatchWarehouses,
    queryFn: async (): Promise<SelectOption[]> => {
      const warehouses = await getWarehouses();
      return warehouses.map((warehouse) => ({
        label: warehouse.name,
        value: warehouse.name,
      }));
    },
    onError: () => {
      message.error("Failed to Load Inventory warehouses");
    },
  });

  const formConfig: FieldConfig[] = [
    {
      name: "date",
      label: "Date",
      type: "date",
      required: true,
    },
    {
      name: "item",
      label: "Item",
      type: "select",
      options: items,
      required: true,
    },
    {
      name: "origin",
      label: "Origin",
      type: "select",
      options: warehouses,
      required: true,
    },
    {
      name: "destination",
      label: "Destination",
      type: "select",
      options: warehouses,
      required: true,
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      required: true,
    },
  ];

  const { userProfile } = useAuthStore();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        values.date = values.date.format("YYYY-MM-DD");
        values.created_by = userProfile?.username;
        values.balance = values.quantity;
        values.origin_stock_id = stocks?.find(
          (stock) =>
            stock.warehouse === values.origin && stock.item === values.item
        )?.id;
        values.destination_stock_id = stocks?.find(
          (stock) =>
            stock.warehouse === values.destination && stock.item === values.item
        )?.id;
        if (values.origin_stock_id === values.destination_stock_id)
          throw new Error("Origin and Destination cannot be the same");
        const parsedValues = await InventoryTransferSchema.parseAsync(values);
        await addInventoryTransfer(parsedValues);
      } catch (error) {
        if (error instanceof ZodError) {
          console.error("Zod Validation failed:", error.errors);
          throw error;
        } else if (error instanceof Error) {
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
      message.success("Inventory Transfer added successfully");
      handleCloseModal();
      queryClient.invalidateQueries();
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

export default useAddNewInventoryTransfer;
