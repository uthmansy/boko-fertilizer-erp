import { useState } from "react";
import { FieldConfig, SelectOption } from "../types/comps";
import { App } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import EnrollmentSchema from "../zodSchemas/enrollments"; // Updated schema
import { ZodError } from "zod";
import { addEnrollment, getWarehouses } from "../helpers/apiFunctions"; // Updated function
import useAuthStore from "../store/auth";
import { USER_ROLE } from "../constants/ENUMS";
import { warehousesKeys } from "../constants/QUERY_KEYS";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

function useAddNewEnrollment(): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { data: warehousesOptions } = useQuery({
    queryKey: warehousesKeys.getAllWarehouses,
    queryFn: async (): Promise<SelectOption[]> => {
      const warehouses = await getWarehouses();
      return warehouses.map((warehouse) => ({
        label: warehouse.name,
        value: warehouse.name,
      }));
    },
    onError: () => {
      message.error("Failed to Load Inventory warehouses");
    },
  });

  const formConfig: FieldConfig[] = [
    {
      name: "email",
      label: "Email", // Added new field
      type: "email",
      required: true,
    },
    {
      name: "role",
      label: "Role", // Added new field
      type: "select",
      required: true,
      options: USER_ROLE.filter((role) => role !== "SUPER ADMIN") // Filter out 'SUPER ADMIN'
        .map((role) => ({ label: role, value: role })),
    },
    {
      name: "warehouse",
      label: "Warehouse", // Added new field
      type: "select",
      required: true,
      options: warehousesOptions || [],
    },
  ];

  const { userProfile } = useAuthStore();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        values.enrolled_by = userProfile?.username;
        await EnrollmentSchema.parseAsync(values); // Updated schema
        await addEnrollment(values); // Updated function
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
      message.success("Enrollment added successfully");
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

export default useAddNewEnrollment;
