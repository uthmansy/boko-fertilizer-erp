import { useState } from "react";
import { FieldConfig, SelectOption } from "../types/comps";
import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { addPurchasePayment } from "../helpers/apiFunctions";

import { PAYMENT_MODE } from "../constants/ENUMS";
import { PurchasePaymentSchema } from "../zodSchemas/purchasePayment";

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

function useAddPurchasePayment({ orderNumber }: Props): HookReturn {
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
      label: "Account Name",
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
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        values.date = values.date.format("YYYY-MM-DD");
        values.order_number = orderNumber;
        await PurchasePaymentSchema.parseAsync(values);
        await addPurchasePayment(values);
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
      message.success("Payment added successfully");
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

export default useAddPurchasePayment;
