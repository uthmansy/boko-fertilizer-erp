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
  shortage: number;
  onValuesChange: (values: any) => void;
}

function useReceiveVehicle({ vehicle }: Props): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [shortage, setShortage] = useState<number>(0);

  const onValuesChange = (values: any) => {
    if (values.qty_received)
      setShortage(vehicle.qty_carried - values.qty_received);
  };

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
      name: "qty_received",
      label: "Quantity Received",
      type: "number",
      required: true,
      suffix: vehicle.item_info.unit,
    },
    // {
    //   name: "shortage",
    //   label: "Shortage",
    //   type: "number",
    //   required: true,
    //   dependencies: ["qty_received"],
    //   getValueFromDependency: (values) => {
    //     const stock = origins?.find(
    //       (origin) => origin.id === values?.external_origin_id
    //     )?.stock_purchases.item;

    //     return stock;
    //   },
    // },
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
        await ReceiveSchema.parseAsync(values);
        if (
          !isAdmin &&
          userProfile?.warehouse !== vehicle.destination_stock.warehouse
        ) {
          throw new Error("You are not authorized to receive this");
        }
        await receiveVehicle(values);
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
    shortage,
    onValuesChange,
  };
}

export default useReceiveVehicle;
