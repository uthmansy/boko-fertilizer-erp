import { useState } from "react";
import { FieldConfig } from "../types/comps";
import { App } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { departmentsKeys, positionsKeys } from "../constants/QUERY_KEYS";
import { EmployeeSchema } from "../zodSchemas/employees";
import {
  addEmployee,
  getAllDepartments,
  getAllPositions,
} from "../helpers/apiFunctions";

import useAuthStore from "../store/auth";
import { Departments, Positions } from "../types/db";
import { EMPLOYMENT_STATUS } from "../constants/ENUMS";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

function useAddNewEmployee(): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { data: departments } = useQuery({
    queryKey: departmentsKeys.getAllDepartments,
    queryFn: async (): Promise<Departments[]> => {
      const departments = await getAllDepartments();
      return departments;
    },
    onError: () => {
      message.error("Failed to Load Departments");
    },
  });

  const { data: positions } = useQuery({
    queryKey: positionsKeys.getAllPositions,
    queryFn: async (): Promise<Positions[]> => {
      const positions = await getAllPositions();
      return positions;
    },
    onError: () => {
      message.error("Failed to Load Positions");
    },
  });

  const formConfig: FieldConfig[] = [
    {
      name: "date_employed",
      label: "Date Employed",
      type: "date",
      required: true,
    },
    {
      name: "first_name",
      label: "First Name",
      type: "text",
      required: true,
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text",
      required: true,
    },
    {
      name: "department",
      label: "Department",
      type: "select",
      options:
        departments?.map((department) => ({
          label: department.name,
          value: department.name,
        })) || [],
      required: true,
    },
    {
      name: "position",
      label: "Position",
      type: "select",
      options:
        positions?.map((position) => ({
          label: position.name,
          value: position.name,
        })) || [],
      required: true,
    },
    {
      name: "salary",
      label: "Salary",
      type: "money",
      required: false,
    },
    {
      name: "allowance",
      label: "Allowance",
      type: "money",
      required: false,
    },
    {
      name: "payroll_type",
      label: "Payroll Type",
      type: "select",
      options: [
        { label: "Salary", value: "salary" },
        { label: "Allowance", value: "allowance" },
      ],
      required: true,
    },
    {
      name: "bank_name",
      label: "Bank Name",
      type: "text",
      required: false,
    },
    {
      name: "bank_account_number",
      label: "Account Number",
      type: "text",
      required: false,
      rules: [
        {
          pattern: /^\d{10}$/,
          message: "Account Number must be 10 digits and contain numbers only",
        },
      ],
    },
    {
      name: "phone_number",
      label: "Phone Number",
      type: "text",
      required: true,
      rules: [
        {
          pattern: /^\d{11}$/,
          message: "Phone Number must be 11 digits and contain numbers only",
        },
      ],
    },
    {
      name: "employment_status",
      label: "Employment Status",
      type: "select",
      options: EMPLOYMENT_STATUS.map((status) => ({
        label: status,
        value: status,
      })),
      required: true,
    },
  ];

  const { userProfile } = useAuthStore();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        if (!values.salary && !values.allowance)
          throw new Error("Either Salary Or Allowance Must be Entered");
        values.date_employed = values.date_employed.format("YYYY-MM-DD");
        values.created_by = userProfile?.username;
        await EmployeeSchema.parseAsync(values);
        await addEmployee(values);
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
      message.success("Employee added successfully");
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

export default useAddNewEmployee;
