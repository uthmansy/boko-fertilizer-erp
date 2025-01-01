import { useState } from "react";
import { FieldConfig, SelectOption } from "../types/comps";
import { App } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { inventoryItemsKeys } from "../constants/QUERY_KEYS";
import { RequestSchema } from "../zodSchemas/requests";
import { createRequest, getInventoryItems } from "../helpers/apiFunctions";

import useAuthStore from "../store/auth";

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
      return items
        .filter((item) => item.type === "raw")
        .map((item) => ({ label: item.name, value: item.name }));
    },
    onError: () => {
      message.error("Failed to Load Inventory Items");
    },
  });

  const formConfig: FieldConfig[] = [
    {
      name: "date_requested",
      label: "Date",
      type: "date",
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

  const { userProfile } = useAuthStore();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        values.date_requested = values.date_requested.format("YYYY-MM-DD");
        values.requested_by = userProfile?.username;
        values.warehouse = userProfile?.warehouse;
        await RequestSchema.parseAsync(values);
        await createRequest(values);
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
