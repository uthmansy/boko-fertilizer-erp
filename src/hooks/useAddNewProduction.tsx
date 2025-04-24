import { useState } from "react";
import { FieldConfig, SelectOption } from "../types/comps";
import { App, FormInstance } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { inventoryItemsKeys, warehousesKeys } from "../constants/QUERY_KEYS";
import { ProductionSchema } from "../zodSchemas/production";
import {
  createProduction,
  getInventoryItems,
  getWarehouses,
} from "../helpers/apiFunctions";
import useAuthStore from "../store/auth";
import { SHIFTS } from "../constants/ENUMS";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

function useAddNewProduction(form: FormInstance): HookReturn {
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
    queryKey: inventoryItemsKeys.getProductionRunProducts,
    queryFn: async (): Promise<Record<"raw" | "products", SelectOption[]>> => {
      const items = await getInventoryItems();
      return {
        raw: items
          .filter((item) => item.type === "raw")
          .map((item) => ({ label: item.name, value: item.name })),
        products: items
          .filter((item) => item.type === "product")
          .map((item) => ({ label: item.name, value: item.name })),
      };
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
            options: warehouses || [],
            required: true,
          },
        ]
      : []) as FieldConfig[]),
    {
      name: "shift",
      label: "Shift",
      type: "select",
      options: SHIFTS.map((shift) => ({ label: shift, value: shift })),
      required: true,
    },
    {
      name: "product",
      label: "Product",
      type: "select",
      options: items?.products,
      required: true,
    },
    {
      name: "quantity_produced",
      label: "Quantity Produced",
      type: "number",
      required: true,
    },
    {
      name: "items",
      label: "Raw Materials",
      type: "dynamic",
      required: true,
      subFields: [
        {
          name: "item",
          label: "Item",
          type: "select",
          options: items?.raw,
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
        values.date = values.date.format("YYYY-MM-DD");
        values.produced_by = userProfile?.username;

        // Set warehouse from profile for non-admins
        if (!isAdmin) {
          values.warehouse = userProfile?.warehouse;
        }

        const payload = await ProductionSchema.parseAsync(values);
        await createProduction(payload);
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
      message.success("Production added successfully");
      form.resetFields();
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

export default useAddNewProduction;
