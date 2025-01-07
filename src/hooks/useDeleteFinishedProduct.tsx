import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { FinishedProductsJoint } from "../types/db"; // Replace with your actual type for production
import { deleteFinishedProduct } from "../helpers/apiFunctions"; // This should be your API function to delete a production run

interface Props {
  finishedProduct: FinishedProductsJoint; // Replace with your actual type for production
}

function useDeleteProduction({ finishedProduct }: Props) {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (resolve: (value: unknown) => void) => {
      try {
        await deleteFinishedProduct(finishedProduct.id); // Call the API to delete the production run
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
      queryClient.invalidateQueries(); // Update to your production query key
    },
  });

  return {
    handleSubmit,
    isLoading,
  };
}

export default useDeleteProduction;
