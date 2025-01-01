import { useState } from "react";
import { FieldConfig } from "../types/comps";
import { App } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import PositionSchema from "../zodSchemas/positions"; // Updated schema
import { ZodError } from "zod";
import { addPosition, getAllDepartments } from "../helpers/apiFunctions"; // Updated function
import { departmentsKeys } from "../constants/QUERY_KEYS";
import { Departments } from "../types/db";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

function useAddNewPosition(): HookReturn {
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

  const formConfig: FieldConfig[] = [
    {
      name: "name",
      label: "Position Name", // Updated label
      type: "text",
      required: true,
    },
    {
      name: "department",
      label: "Department", // Added field for department
      type: "select",
      options:
        departments?.map((department) => ({
          label: department.name,
          value: department.name,
        })) || [],
      required: true,
    },
    {
      name: "description",
      label: "Description", // Added new field
      type: "textarea",
      required: false,
    },
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        await PositionSchema.parseAsync(values); // Updated schema
        await addPosition(values); // Updated function
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
      message.success("Position added successfully");
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

export default useAddNewPosition;
