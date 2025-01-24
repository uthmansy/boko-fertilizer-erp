import { useState } from "react";
import { FieldConfig, SelectOption } from "../types/comps";
import { App, FormInstance } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { inventoryItemsKeys } from "../constants/QUERY_KEYS"; // Update to production keys
import {
  addFinishedProducts,
  getInventoryItems,
} from "../helpers/apiFunctions"; // Update to production API function

import useAuthStore from "../store/auth";
import { SHIFTS } from "../constants/ENUMS";
import { finishedProductsMultipleSchema } from "../zodSchemas/finishedProducts";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

function useAddNewFinishedProduct(form: FormInstance): HookReturn {
  // Update hook name
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { data: products } = useQuery({
    queryKey: inventoryItemsKeys.getRawAndProduct,
    queryFn: async (): Promise<SelectOption[]> => {
      const items = await getInventoryItems();
      return items
        .filter((item) => item.type === "product") // Filter finished products
        .map((item) => ({ label: item.name, value: item.name }));
    },
    onError: () => {
      message.error("Failed to Load Products List");
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
          options: products,
          required: true,
        },
        {
          name: "quantity_produced",
          label: "Quantity (bales)",
          type: "number",
          required: true,
        },
        {
          name: "waste",
          label: "Reject (pieces)",
          type: "number",
          required: true,
        },
      ],
    },
  ];

  const { userProfile } = useAuthStore();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        values.date = values.date.format("YYYY-MM-DD");
        values.added_by = userProfile?.username;
        values.warehouse = userProfile?.warehouse;
        // await finishedProductsSchema.parseAsync(values); // Validate against production schema for single product addition
        await finishedProductsMultipleSchema.parseAsync(values); // Validate against production schema for multiple products addition
        // await addFinishedProduct(values); // Use production creation API function for singular product addition
        await addFinishedProducts(values); // Use production creation API function for multiple products addition
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
      message.success("Added successfully");
      form.resetFields();
      handleCloseModal();
      queryClient.invalidateQueries(); // Invalidate production queries
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

export default useAddNewFinishedProduct;
