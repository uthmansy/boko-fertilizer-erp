import { useState } from "react";
import { FieldConfig } from "../types/comps";
import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { updateFinishedProduct } from "../helpers/apiFunctions";
import { FinishedProductsJoint } from "../types/db";
import { UpdateFinishedProductsSchema } from "../zodSchemas/finishedProducts";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

interface Prop {
  product: FinishedProductsJoint;
}

function useEditFinishedProduct({ product }: Prop): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const formConfig: FieldConfig[] = [
    // {
    //   name: "quantity_produced",
    //   label: "Quantity Produced",
    //   type: "number",
    //   required: false,
    //   defaultValue: product.quantity_produced || undefined,
    // },
    {
      name: "waste",
      label: "Rejects",
      type: "number",
      required: false,
      defaultValue: product.waste || undefined,
    },
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        if (values.date) values.date = values.date.format("YYYY-MM-DD");
        values.id = product.id;
        const payload = await UpdateFinishedProductsSchema.parseAsync(values);
        await updateFinishedProduct(payload);
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
      message.error(error.message || "Failed to update Finished Product");
    },
    onSuccess: () => {
      message.success("Record updated successfully");
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

export default useEditFinishedProduct;
