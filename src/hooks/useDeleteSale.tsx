import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { Sales } from "../types/db"; // Adjust type import according to your schema
import { deleteSale } from "../helpers/apiFunctions"; // Update this to your API function for deleting a sale

interface Props {
  sale: Sales; // Update type to match your sale data structure
}

function useDeleteSale({ sale }: Props) {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (resolve: (value: unknown) => void) => {
      try {
        await deleteSale(sale.id); // Call the API to delete the sale
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
      queryClient.invalidateQueries(); // Invalidate queries related to sales
    },
  });

  return {
    handleSubmit,
    isLoading,
  };
}

export default useDeleteSale;
