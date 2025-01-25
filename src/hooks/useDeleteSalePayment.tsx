import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { deleteSalePayment } from "../helpers/apiFunctions"; // Updated API function import
import { SalesPayments } from "../types/db";

interface Props {
  payment: SalesPayments; // Updated prop type
}

function useDeleteSalePayment({ payment }: Props) {
  // Renamed hook
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (resolve: (value: unknown) => void) => {
      try {
        await deleteSalePayment(payment.id); // Updated API call
        resolve("deleted");
      } catch (error) {
        if (error instanceof Error) {
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
      message.success("Deleted successfully");
      queryClient.invalidateQueries(); // Invalidate payment-related queries
    },
  });

  return {
    handleSubmit,
    isLoading,
  };
}

export default useDeleteSalePayment; // Updated export name
