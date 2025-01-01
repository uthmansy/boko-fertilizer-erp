import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { Expenses } from "../types/db"; // Adjust this to match the type for expense data
import { deleteExpense } from "../helpers/apiFunctions"; // This should be your API function to delete an expense

interface Props {
  expense: Expenses;
}

function useDeleteExpense({ expense }: Props) {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (resolve: (value: unknown) => void) => {
      try {
        await deleteExpense(expense.id); // Call the API to delete the expense
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
      queryClient.invalidateQueries(); // Invalidate queries to refresh data
    },
  });

  return {
    handleSubmit,
    isLoading,
  };
}

export default useDeleteExpense;
