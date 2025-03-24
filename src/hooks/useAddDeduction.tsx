import { FieldConfig } from "../types/comps";
import { App } from "antd";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { CreateDeductionSchema } from "../zodSchemas/payrollDeductions";
import { addPayrollDeduction } from "../helpers/apiFunctions";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

interface Props {
  payrollId: string;
}

function useAddDeduction({ payrollId }: Props): HookReturn {
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
    { label: "Amount", name: "amount", type: "money", required: true },
    { label: "Note", name: "note", type: "text", required: true },
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        values.employee_payroll_id = payrollId;
        values.deduction_type = "other";
        const payload = await CreateDeductionSchema.parseAsync(values);
        await addPayrollDeduction(payload);
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
      message.success("Added successfully");
      handleCloseModal();
      queryClient.invalidateQueries(); // Update to use salesKeys
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

export default useAddDeduction;
