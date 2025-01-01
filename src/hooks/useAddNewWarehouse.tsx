import { useState } from "react";
import { FieldConfig, SelectOption } from "../types/comps";
import { STATES } from "../constants/ENUMS";
import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import WarehouseSchema from "../zodSchemas/warehouses";
import { ZodError } from "zod";
import { addWarehouse } from "../helpers/apiFunctions";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

function useAddNewWarehouse(): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const statesOptions: SelectOption[] = STATES.map((state) => ({
    value: state,
    label: state.charAt(0).toUpperCase() + state.slice(1),
  }));

  const formConfig: FieldConfig[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      required: true,
    },
    {
      name: "code",
      label: "Code",
      type: "text",
      required: true,
      rules: [
        {
          pattern: /^[A-Z]{3}$/,
          message: "Code must be a 3-letter uppercase string",
        },
      ],
    },
    {
      name: "location",
      label: "Location",
      type: "select",
      options: statesOptions,
      required: true,
    },
    {
      name: "stock_receiver_phone",
      label: "Stock Receiver Phone",
      type: "text",
      required: true,
      rules: [
        {
          pattern: /^\d{11}$/,
          message:
            "Stock receiver phone must be eleven digits and contain only numbers",
        },
      ],
    },
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        await WarehouseSchema.parseAsync(values);
        await addWarehouse(values);
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
      message.success("Warehouse added successfully");
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

export default useAddNewWarehouse;
