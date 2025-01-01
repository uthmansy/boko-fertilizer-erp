import { useState } from "react";
import { FieldConfig } from "../types/comps";
import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { ZodError } from "zod";
import {
  updateEmployeePayroll, // Ensure you have this function
} from "../helpers/apiFunctions";

import { EmployeePayrollAndEmployee } from "../types/db";
import UpdateEmployeePayrollSchema from "../zodSchemas/employeePayroll";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

interface Prop {
  employeePayroll: EmployeePayrollAndEmployee; // Update to Payroll type
}

function useEditEmployeePayroll({ employeePayroll }: Prop): HookReturn {
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
      name: "to_be_paid",
      label: "To be Paid",
      type: "money",
      required: false,
      defaultValue: employeePayroll.to_be_paid,
    },
    {
      name: "note",
      label: "Note",
      type: "text",
      required: false,
      defaultValue: employeePayroll.note || undefined,
    },
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        values.id = employeePayroll.id;
        const parsedValues = await UpdateEmployeePayrollSchema.parseAsync(
          values
        );
        await updateEmployeePayroll(parsedValues); // Ensure this function exists and takes the payroll id
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
      message.success("Payroll updated successfully");
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

export default useEditEmployeePayroll;
