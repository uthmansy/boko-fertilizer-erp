import { useState } from "react";
import { FieldConfig } from "../types/comps";
import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { updateSaleItem } from "../helpers/apiFunctions";
import { SalesItemsJoined } from "../types/db";
import { UpdateSaleItemSchema } from "../zodSchemas/saleItem";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

interface Prop {
  item: SalesItemsJoined;
}

function useEditSaleItem({ item }: Prop): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const formConfig: FieldConfig[] = [
    {
      name: "price",
      label: "Price",
      type: "money",
      required: false,
      defaultValue: item.price,
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      required: false,
      defaultValue: item.quantity,
      rules: [
        {
          pattern: /^[1-9]\d*$/,
          message: "Quantity must be a positive integer",
        },
      ],
    },
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        values.id = item.id;
        const payload = await UpdateSaleItemSchema.parseAsync(values);
        await updateSaleItem(payload);
      } catch (error) {
        if (error instanceof ZodError) {
          console.error("Validation failed:", error.errors);
          throw error;
        }
        throw new Error(
          error instanceof Error ? error.message : "Unknown error"
        );
      }
    },
    onError: (error: Error) => {
      message.error(error.message || "Failed to update");
    },
    onSuccess: () => {
      message.success("updated successfully");
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

export default useEditSaleItem;
