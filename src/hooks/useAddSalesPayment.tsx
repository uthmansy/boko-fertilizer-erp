import { useState } from "react";
import { FieldConfig, SelectOption } from "../types/comps";
import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { addSalesPayment, uploadImage } from "../helpers/apiFunctions"; // Updated function

import { PAYMENT_MODE } from "../constants/ENUMS";
import { SalesPaymentSchema } from "../zodSchemas/salePayment"; // Updated schema

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

interface Props {
  orderNumber: string;
}

function useAddSalesPayment({ orderNumber }: Props): HookReturn {
  // Updated hook name
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const paymentModeOptions: SelectOption[] = PAYMENT_MODE.map((mode) => ({
    label: mode,
    value: mode,
  }));

  const formConfig: FieldConfig[] = [
    {
      name: "date",
      label: "Date",
      type: "date",
      required: true,
    },
    {
      name: "account_number",
      label: "Account Number",
      type: "text",
      required: false,
    },
    {
      name: "amount",
      label: "Amount",
      type: "money",
      required: true,
    },
    {
      name: "account_name",
      label: "Acount Name",
      type: "text",
      required: false,
    },
    {
      name: "bank_name",
      label: "Bank Name",
      type: "text",
      required: false,
    },
    {
      name: "payment_mode",
      label: "Payment Mode",
      type: "select",
      options: paymentModeOptions,
      required: true,
    },
    {
      name: "payment_ref",
      label: "Payment Reference",
      type: "text",
      required: false,
    },
    {
      name: "receipt",
      label: "Receipt",
      type: "image",
      required: false,
    },
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        if (values.receipt) {
          const data = await uploadImage(values.receipt.file, "receipts");
          values.receipt_path = data.filePath;
          values.receipt = data.publicUrl;
        }
        values.date = values.date.format("YYYY-MM-DD");
        values.order_number = orderNumber;
        await SalesPaymentSchema.parseAsync(values); // Updated schema validation
        await addSalesPayment(values); // Updated API call
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
      message.success("Payment added successfully");
      handleCloseModal();
      queryClient.invalidateQueries(); // Updated query key
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

export default useAddSalesPayment; // Updated export
