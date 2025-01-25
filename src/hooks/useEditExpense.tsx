import { useState } from "react";
import { FieldConfig } from "../types/comps";
import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { UpdateExpenseSchema } from "../zodSchemas/expenses";
import { updateExpense } from "../helpers/apiFunctions";
import { Expenses } from "../types/db";
import dayjs from "dayjs";
import { valueType } from "antd/es/statistic/utils";
import { EXPENSE_CATEGORY, PAYMENT_MODE } from "../constants/ENUMS";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

interface Prop {
  expense: Expenses;
}

function useEditExpense({ expense }: Prop): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const formConfig: FieldConfig[] = [
    {
      name: "date",
      label: "Date",
      type: "date",
      required: false,
      defaultValue: dayjs(expense.date, "YYYY-MM-DD") as unknown as valueType,
    },
    {
      name: "amount",
      label: "Amount",
      type: "money",
      required: false,
      defaultValue: expense.amount,
      rules: [
        {
          pattern: /^[1-9]\d*(\.\d{1,2})?$/,
          message: "Invalid amount format",
        },
      ],
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: EXPENSE_CATEGORY.map((cat) => ({
        label: cat,
        value: cat,
      })),
      required: false,
      defaultValue: expense.category,
    },
    {
      name: "payment_method",
      label: "Payment Method",
      type: "select",
      options: PAYMENT_MODE.map((mode) => ({
        label: mode,
        value: mode,
      })),
      required: false,
      defaultValue: expense.payment_method || undefined,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: false,
      defaultValue: expense.description || "",
      rules: [
        { max: 255, message: "Description cannot exceed 255 characters" },
      ],
    },
    {
      name: "notes",
      label: "Notes",
      type: "textarea",
      required: false,
      defaultValue: expense.notes || "",
      rules: [{ max: 1000, message: "Notes cannot exceed 1000 characters" }],
    },
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        if (values.date) values.date = values.date.format("YYYY-MM-DD");
        values.id = expense.id;
        const payload = await UpdateExpenseSchema.parseAsync(values);
        await updateExpense(payload);
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
      message.error(error.message || "Failed to update expense");
    },
    onSuccess: () => {
      message.success("Expense updated successfully");
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

export default useEditExpense;
