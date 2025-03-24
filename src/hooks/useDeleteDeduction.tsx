import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { deleteDeduction } from "../helpers/apiFunctions"; // Updated API function import

interface Props {
  id: string; // Updated prop type
}

function useDeleteDeduction({ id }: Props) {
  // Renamed hook
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (resolve: (value: unknown) => void) => {
      try {
        await deleteDeduction(id); // Updated API call
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

export default useDeleteDeduction; // Updated export name
