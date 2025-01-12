import { useState } from "react";
import { FieldConfig, SelectOption } from "../types/comps";
import { App } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { inventoryItemsKeys } from "../constants/QUERY_KEYS"; // Update to production keys
import { ProductionSchema } from "../zodSchemas/production"; // Update to production schema
import { createProduction, getInventoryItems } from "../helpers/apiFunctions"; // Update to production API function

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

function useAddNewProduction(): HookReturn {
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

  const { data: items } = useQuery({
    queryKey: inventoryItemsKeys.getProductionRunProducts,
    queryFn: async (): Promise<Record<"raw" | "products", SelectOption[]>> => {
      const items = await getInventoryItems();
      return {
        raw: items
          .filter((item) => item.type === "raw") // Filter raw materials
          .map((item) => ({ label: item.name, value: item.name })),
        products: items
          .filter((item) => item.type === "product") // Filter finished products
          .map((item) => ({ label: item.name, value: item.name })),
      };
    },
    onError: () => {
      message.error("Failed to Load Inventory Items");
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
      name: "product",
      label: "Product",
      type: "select",
      options: items?.products,
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
      name: "quantity_produced",
      label: "Quantity Produced (in Metres)",
      type: "number",
      required: true,
    },
    // {
    //   name: "items",
    //   label: "Raw Materials Used",
    //   type: "dynamic",
    //   required: true,
    //   subFields: [
    //     {
    //       name: "item",
    //       label: "Item",
    //       type: "select",
    //       options: items?.raw,
    //       required: true,
    //     },
    //     {
    //       name: "quantity",
    //       label: "Quantity Used",
    //       type: "number",
    //       required: true,
    //     },
    //   ],
    // },
  ];

  const { userProfile } = useAuthStore();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        values.date = values.date.format("YYYY-MM-DD");
        values.items = [];
        values.produced_by = userProfile?.username;
        values.warehouse = userProfile?.warehouse;
        await ProductionSchema.parseAsync(values); // Validate against production schema
        await createProduction(values); // Use production creation API function
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
      message.success("Production added successfully");
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

export default useAddNewProduction;
