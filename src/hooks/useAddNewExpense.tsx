import { useState } from "react";
import { FieldConfig } from "../types/comps";
import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import ExpenseSchema from "../zodSchemas/expenses"; // Updated schema
import { ZodError } from "zod";
import { addExpense } from "../helpers/apiFunctions"; // Updated function
import { EXPENSE_CATEGORY, PAYMENT_MODE } from "../constants/ENUMS";
import useAuthStore from "../store/auth";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

function useAddNewExpense(): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formConfig: FieldConfig[] = [
    {
      name: "category",
      label: "Expense Category", // Updated label
      type: "select",
      options: EXPENSE_CATEGORY.map((cat) => ({ label: cat, value: cat })),
      required: true,
    },
    {
      name: "amount",
      label: "Amount", // Updated label
      type: "number",
      required: true,
    },
    {
      name: "payment_method",
      label: "Payment Method", // Updated label
      type: "select",
      options: PAYMENT_MODE.map((mode) => ({ label: mode, value: mode })),
      required: false,
    },
    {
      name: "date",
      label: "Date", // Updated label
      type: "date",
      required: true,
    },
    {
      name: "beneficiary",
      label: "Beneficiary", // Updated label
      type: "text",
      required: false,
    },
    {
      name: "invoice_number",
      label: "Invoice Number", // Updated label
      type: "text",
      required: false,
    },
    {
      name: "description",
      label: "Description", // Added new field
      type: "textarea",
      required: true,
    },
    {
      name: "notes",
      label: "Note", // Added new field
      type: "textarea",
      required: false,
    },
  ];

  const { userProfile } = useAuthStore();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        values.created_by = userProfile?.username;
        values.date = values.date.format("YYYY-MM-DD");
        await ExpenseSchema.parseAsync(values); // Updated schema
        await addExpense(values); // Updated function
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
      message.success("Expense added successfully");
      handleCloseModal();
      queryClient.invalidateQueries(); // Optionally, specify the query key if needed
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

export default useAddNewExpense;
