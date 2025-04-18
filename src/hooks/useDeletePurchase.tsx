import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { PurchasesAndPayments } from "../types/db"; // Adjust type import according to your schema
import { deletePurchase } from "../helpers/apiFunctions";

interface Props {
  purchase: PurchasesAndPayments;
}

function useDeletePurchase({ purchase }: Props) {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (resolve: (value: unknown) => void) => {
      try {
        await deletePurchase(purchase.id);
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
      queryClient.invalidateQueries();
    },
  });

  return {
    handleSubmit,
    isLoading,
  };
}

export default useDeletePurchase;
