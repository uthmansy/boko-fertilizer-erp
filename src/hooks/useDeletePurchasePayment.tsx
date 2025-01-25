import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { PurchasePayments } from "../types/db";
import { deletePurchasePayment } from "../helpers/apiFunctions";

interface Props {
  purchasePayment: PurchasePayments;
}

function useDeletePurchasePayment({ purchasePayment }: Props) {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (resolve: (value: unknown) => void) => {
      try {
        await deletePurchasePayment(purchasePayment.id);
        resolve("deleted");
      } catch (error) {
        if (error instanceof Error) {
          console.error("Delete failed:", error.message);
          throw new Error(error.message);
        }
        console.error("Unknown error:", error);
        throw new Error("Failed to delete purchase payment");
      }
    },
    onError: (error) => {
      message.error(error instanceof Error ? error.message : "Deletion failed");
    },
    onSuccess: () => {
      message.success("Purchase payment deleted successfully");
      queryClient.invalidateQueries();
    },
  });

  return { handleSubmit, isLoading };
}

export default useDeletePurchasePayment;
