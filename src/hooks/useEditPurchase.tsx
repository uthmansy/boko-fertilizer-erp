// useEditPurchase.ts
import { useState } from "react";
import { FieldConfig } from "../types/comps";
import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { UpdatePurchaseSchema } from "../zodSchemas/purchases";
import { updatePurchase } from "../helpers/apiFunctions";
import { Purchases } from "../types/db";
import dayjs from "dayjs";
import { valueType } from "antd/es/statistic/utils";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

interface Prop {
  purchase: Purchases;
}

function useEditPurchase({ purchase }: Prop): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const formConfig: FieldConfig[] = [
    {
      name: "date",
      label: "Purchase Date",
      type: "date",
      required: false,
      defaultValue: (dayjs(purchase.date, "YYYY-MM-DD") ||
        undefined) as unknown as valueType,
    },
    {
      name: "seller",
      label: "Seller",
      type: "text",
      required: false,
      defaultValue: purchase.seller,
      rules: [
        { min: 3, message: "Seller name must be at least 3 characters" },
        { max: 50, message: "Seller name cannot exceed 50 characters" },
      ],
    },
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        // Format date and convert numeric values
        if (values.date) values.date = values.date.format("YYYY-MM-DD");
        values.id = purchase.id;
        const payload = await UpdatePurchaseSchema.parseAsync(values);
        await updatePurchase(payload);
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
      message.error(error.message || "Failed to update purchase");
    },
    onSuccess: () => {
      message.success("Purchase updated successfully");
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

export default useEditPurchase;
