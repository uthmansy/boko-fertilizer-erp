import { useState } from "react";
import { FieldConfig } from "../types/comps";
import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { ZodError } from "zod";
import ReceiveSchema from "../zodSchemas/receive";
import useAuthStore from "../store/auth";
import { VehiclesAndDestination, vehicleStatus } from "../types/db";
import { receiveVehicle } from "../helpers/apiFunctions";

interface Props {
  vehicle: VehiclesAndDestination;
}

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

function useReceiveVehicle({ vehicle }: Props): HookReturn {
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
      name: "date_received",
      label: "Date",
      type: "date",
      required: true,
    },
    {
      name: "paid_on_receive",
      label: "Transport Fee balance Paid",
      type: "money",
      required: true,
    },
    {
      type: "group",
      nestAsArray: true,
      name: "items",
      groupLabel: "Items Received",
      groupStyle: { backgroundColor: "#f5f5f5" },
      groupClassName: "custom-group",
      groupFields: [
        ...(vehicle.items.map((item) => ({
          label: `${item.item}, (${
            item.qty_carried + " " + item.item_info.unit
          } dispatched)`,
          name: item.id,
          type: "number",
          required: true,
          velue: item.qty_carried,
          max: item.qty_carried,
        })) as FieldConfig[]),
      ],
    },
  ];

  const { userProfile } = useAuthStore();
  const isAdmin = userProfile?.role === "SUPER ADMIN";

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        values.date_received = values.date_received.format("YYYY-MM-DD");
        values.received_by = userProfile?.username;
        const status: vehicleStatus = "received";
        values.status = status;
        values.id = vehicle.id;
        values.items = vehicle.items.map((vehicleItem) => {
          // Find the corresponding quantity in values.items
          const foundItem = values.items.find(
            (valueItem: {
              [key: string]: number; // Define key-value structure
            }) => valueItem[vehicleItem.id] !== undefined
          );

          return {
            ...vehicleItem,
            qty_received: foundItem ? foundItem[vehicleItem.id] : 0, // Default to 0 if not found
          };
        });
        const payload = await ReceiveSchema.parseAsync(values);
        if (
          !isAdmin &&
          userProfile?.warehouse !== vehicle.destination_info?.name
        ) {
          throw new Error("You are not authorized to receive this");
        }
        await receiveVehicle(payload);
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
      message.success("Vehicle Received successfully");
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

export default useReceiveVehicle;
