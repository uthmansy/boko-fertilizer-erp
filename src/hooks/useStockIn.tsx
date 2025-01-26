import { useState } from "react";
import { FieldConfig, SelectOption } from "../types/comps";
import { App } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodError } from "zod";
import {
  getInventoryItems,
  getWarehouses,
  stockIn,
} from "../helpers/apiFunctions";
import { inventoryItemsKeys, warehousesKeys } from "../constants/QUERY_KEYS";
import useAuthStore from "../store/auth";
import { stockInSchema } from "../zodSchemas/stockIn";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

function useStockIn(): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const { userProfile } = useAuthStore();
  const isAdmin = userProfile?.role === "SUPER ADMIN";

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Fetch warehouses only for admin users
  const { data: warehousesOptions } = useQuery({
    queryKey: warehousesKeys.getAllWarehouses,
    queryFn: async (): Promise<SelectOption[]> => {
      const warehouses = await getWarehouses();
      return warehouses.map((warehouse) => ({
        label: warehouse.name,
        value: warehouse.name,
      }));
    },
    enabled: isAdmin,
    onError: () => message.error("Failed to Load Warehouses"),
  });

  const { data: items } = useQuery({
    queryKey: inventoryItemsKeys.getAllItems,
    queryFn: async (): Promise<SelectOption[]> => {
      const items = await getInventoryItems();
      return items.map((item) => ({ label: item.name, value: item.name }));
    },
    onError: () => message.error("Failed to Load Inventory Items"),
  });

  const formConfig: FieldConfig[] = [
    {
      name: "date",
      label: "Date",
      type: "date",
      required: true,
    },
    // Conditionally show warehouse field for admins
    ...((isAdmin
      ? [
          {
            name: "warehouse",
            label: "Warehouse",
            type: "select",
            options: warehousesOptions || [],
            required: true,
          },
        ]
      : []) as FieldConfig[]),
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: false,
    },
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        values.item = items?.find((item) => item.value === "waste")?.value;
        values.date = values.date.format("YYYY-MM-DD");
        values.stocked_by = userProfile?.username;

        // Set warehouse from profile for non-admins
        if (!isAdmin) {
          values.warehouse = userProfile?.warehouse;
        }

        const payload = await stockInSchema.parseAsync(values);
        //@ts-ignore
        await stockIn(payload);
      } catch (error) {
        if (error instanceof ZodError) {
          console.error("Zod Validation failed:", error.errors);
          throw error;
        }
        throw new Error(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
      }
    },
    onError: (error) => {
      message.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    },
    onSuccess: () => {
      message.success("Stocked In successfully");
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

export default useStockIn;
