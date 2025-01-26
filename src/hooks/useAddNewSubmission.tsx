import { useState } from "react";
import { FieldConfig, SelectOption } from "../types/comps";
import { App } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { inventoryItemsKeys, warehousesKeys } from "../constants/QUERY_KEYS";
import {
  addProductSubmissions,
  getInventoryItems,
  getWarehouses,
} from "../helpers/apiFunctions";
import useAuthStore from "../store/auth";
import { MultiProductSubmissionSchema } from "../zodSchemas/submission";
import { SHIFTS } from "../constants/ENUMS";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

function useAddNewSubmission(): HookReturn {
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
    queryKey: inventoryItemsKeys.getAllItems,
    queryFn: async (): Promise<SelectOption[]> => {
      const items = await getInventoryItems();
      return items
        .filter((item) => item.type === "product")
        .map((item) => ({ label: item.name, value: item.name }));
    },
    onError: () => message.error("Failed to Load Inventory Items"),
  });

  const formConfig: FieldConfig[] = [
    {
      name: "date_submitted",
      label: "Date Submitted",
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
      name: "products",
      label: "Products",
      type: "dynamic",
      required: true,
      subFields: [
        {
          name: "product",
          label: "Product",
          type: "select",
          options: items,
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
        values.date_submitted = values.date_submitted.format("YYYY-MM-DD");
        values.submitted_by = userProfile?.username;

        // Set warehouse from profile for non-admins
        if (!isAdmin) {
          values.warehouse = userProfile?.warehouse;
        }

        await MultiProductSubmissionSchema.parseAsync(values);
        await addProductSubmissions(values);
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
      message.success("Submission added successfully");
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

export default useAddNewSubmission;
