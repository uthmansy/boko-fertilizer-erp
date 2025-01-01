import { useState } from "react";
import { FieldConfig, SelectOption } from "../types/comps";
import { App } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodError } from "zod";
import {
  getWarehouses,
  updateUser, // Ensure you have this function
} from "../helpers/apiFunctions";

import { UserProfile } from "../types/db"; // Adjust types to match your setup
import { USER_ROLE } from "../constants/ENUMS";
import EditUserSchema from "../zodSchemas/users";
import { warehousesKeys } from "../constants/QUERY_KEYS";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

interface Prop {
  user: UserProfile; // Assuming Users is the type for a user
}

function useEditUser({ user }: Prop): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { data: warehouses } = useQuery({
    queryKey: warehousesKeys.getDispatchWarehouses,
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
      name: "role",
      label: "Role",
      type: "select",
      options: USER_ROLE.filter((role) => role !== "SUPER ADMIN") // Filter out 'SUPER ADMIN'
        .map((role) => ({ label: role, value: role })),
      required: false,
      defaultValue: user.role || undefined,
    },
    {
      name: "warehouse",
      label: "Warehouse",
      type: "select",
      options: warehouses,
      required: false,
      defaultValue: user.warehouse || undefined,
    },
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        values.id = user.id;
        await EditUserSchema.parseAsync(values);
        await updateUser(values); // Ensure this function exists and takes the user id
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
      message.success("User updated successfully");
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

export default useEditUser;
