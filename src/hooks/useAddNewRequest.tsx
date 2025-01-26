import { useState } from "react";
import { FieldConfig } from "../types/comps";
import { App } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { inventoryItemsKeys, warehousesKeys } from "../constants/QUERY_KEYS";
import { RequestSchema } from "../zodSchemas/requests";
import {
  createRequest,
  getInventoryItems,
  getWarehouses,
} from "../helpers/apiFunctions";
import useAuthStore from "../store/auth";
import { InventoryItems, Shifts } from "../types/db";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

function useAddNewRequest(): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const { userProfile } = useAuthStore();
  const isAdmin = userProfile?.role === "SUPER ADMIN";

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Warehouse query for admins
  const { data: warehouses } = useQuery({
    queryKey: warehousesKeys.getAllWarehouses,
    queryFn: async () => {
      const warehouses = await getWarehouses();
      return warehouses.map((warehouse) => ({
        label: warehouse.name,
        value: warehouse.name,
      }));
    },
    enabled: isAdmin,
    onError: () => message.error("Failed to load warehouses"),
  });

  const { data: items } = useQuery({
    queryKey: inventoryItemsKeys.getAllItemsAsOptions,
    queryFn: async (): Promise<InventoryItems[]> => {
      return await getInventoryItems();
    },
    onError: () => message.error("Failed to Load Inventory Items"),
  });

  const shifts: Shifts[] = ["morning", "night"];

  const formConfig: FieldConfig[] = [
    {
      name: "date_requested",
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
            options: warehouses || [],
            required: true,
          },
        ]
      : []) as FieldConfig[]),
    {
      name: "shift",
      label: "Shift",
      type: "select",
      options: shifts.map((shift) => ({ label: shift, value: shift })),
      required: true,
    },
    {
      name: "items",
      label: "Items",
      type: "dynamic",
      required: true,
      subFields: [
        {
          name: "item",
          label: "Item",
          type: "select",
          options:
            items
              ?.filter((item) => item.type === "raw")
              .map((item) => ({
                label: `${item.name} (in ${item.unit})`,
                value: item.name,
              })) || [],
          required: true,
        },
        {
          name: "quantity",
          label: "Quantity",
          type: "number",
          required: true,
        },
      ],
    },
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        values.date_requested = values.date_requested.format("YYYY-MM-DD");
        values.requested_by = userProfile?.username;

        // Set warehouse from profile for non-admins
        if (!isAdmin) {
          values.warehouse = userProfile?.warehouse;
        }

        await RequestSchema.parseAsync(values);
        await createRequest(values);
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
      message.success("Item added successfully");
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

export default useAddNewRequest;
