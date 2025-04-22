import { useRef, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { WaybillNumberSchema } from "../zodSchemas/waybill";
import { ZodError } from "zod";
import { App } from "antd";
import { getVehicleByWaybill } from "../helpers/apiFunctions";
import { VehiclesAndDestination } from "../types/db";
// import useAuthStore from "../store/auth";

type UseScanWaybillReturn = {
  qrData: string;
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  vehicle: VehiclesAndDestination | undefined;
};

const useScanWaybill = (): UseScanWaybillReturn => {
  const [qrData, setQrData] = useState<string>("");

  // Ref for the hidden input
  const inputRef = useRef<HTMLInputElement>(null);

  const { message } = App.useApp();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Focus the hidden input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Keep focusing the input if qrData is empty
  useEffect(() => {
    if (!qrData && inputRef.current) {
      inputRef.current.focus();
    }
  }, [qrData]);

  // Ensure input field is refocused if it loses focus and qrData is empty
  useEffect(() => {
    const handleBlur = () => {
      if (!qrData && inputRef.current) {
        inputRef.current.focus();
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("blur", handleBlur);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("blur", handleBlur);
      }
    };
  }, [qrData]);

  // const { userProfile } = useAuthStore();
  // const isAdmin = userProfile?.role === "SUPER ADMIN";

  const {
    data: vehicle,
    mutate: handleSubmit,
    isLoading,
  } = useMutation({
    mutationFn: async (
      event: React.FormEvent<HTMLFormElement>
    ): Promise<VehiclesAndDestination | undefined> => {
      event.preventDefault(); // Prevent default form submission behavior
      try {
        if (inputRef.current) {
          const scannedData = inputRef.current.value; // Get value from the input
          console.log(scannedData);
          setQrData(scannedData); // Update the state with QR data
          await WaybillNumberSchema.parseAsync(scannedData);
          message.loading("Loading Vehicle...");
          const vehicle = await getVehicleByWaybill(scannedData);
          if (!vehicle) throw new Error("Error Loading Vehicle");
          if (!(vehicle?.status === "dispatched"))
            throw new Error("Vehicle Already Received");
          // if (
          //   !isAdmin &&
          //   userProfile?.warehouse !== vehicle.destination
          // ) {
          //   throw new Error("You are not authorized to receive this");
          // }
          return vehicle;
        }
      } catch (error) {
        if (error instanceof ZodError) {
          // Handle ZodError separately to extract and display validation errors
          console.error("Invalid Waybill");
          throw error.message; // Re-throw the ZodError to be caught by the onError handler
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
      handleOpenModal();
      // queryClient.invalidateQueries(); // Update to use salesKeys
    },
    onSettled: () => {
      if (inputRef.current) inputRef.current.value = ""; // Clear input after processing
    },
  });

  return {
    qrData,
    handleSubmit,
    inputRef,
    isModalOpen,
    handleCloseModal,
    handleOpenModal,
    isLoading,
    vehicle,
  };
};

export default useScanWaybill;
