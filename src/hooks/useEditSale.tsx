import { useState } from "react";
import { FieldConfig } from "../types/comps";
import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { UpdateSaleSchema } from "../zodSchemas/sales";
import { updateSale } from "../helpers/apiFunctions";
import { SalesAndPayments } from "../types/db";
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
  sale: SalesAndPayments;
}

function useEditSale({ sale }: Prop): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const formConfig: FieldConfig[] = [
    {
      name: "date",
      label: "Sale Date",
      type: "date",
      required: false,
      defaultValue: (dayjs(sale.date, "YYYY-MM-DD") ||
        undefined) as unknown as valueType,
    },
    {
      name: "customer_name",
      label: "Customer Name",
      type: "text",
      required: false,
      defaultValue: sale.customer_name,
      rules: [
        { min: 3, message: "Customer name must be at least 3 characters" },
        { max: 50, message: "Customer name cannot exceed 50 characters" },
      ],
    },
    {
      name: "customer_phone",
      label: "Customer Phone",
      type: "text",
      required: false,
      defaultValue: sale.customer_name,
      rules: [
        { min: 3, message: "Customer name must be at least 3 characters" },
        { max: 50, message: "Customer name cannot exceed 50 characters" },
      ],
    },
    {
      name: "price",
      label: "Price",
      type: "money",
      required: false,
      defaultValue: sale.price,
      rules: [
        {
          pattern: /^[1-9]\d*(\.\d{1,2})?$/,
          message: "Invalid price format",
        },
      ],
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      required: false,
      defaultValue: sale.quantity,
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
        if (values.date) values.date = values.date.format("YYYY-MM-DD");
        values.id = sale.id;
        const payload = await UpdateSaleSchema.parseAsync(values);
        await updateSale(payload);
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
      message.error(error.message || "Failed to update sale");
    },
    onSuccess: () => {
      message.success("Sale updated successfully");
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

export default useEditSale;
