import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { Payrolls } from "../types/db"; // Assuming Payroll is the type for payroll data
import { deletePayroll } from "../helpers/apiFunctions"; // This should be your API function to delete a payroll

interface Props {
  payroll: Payrolls;
}

function useDeletePayroll({ payroll }: Props) {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (resolve: (value: unknown) => void) => {
      try {
        await deletePayroll(payroll.id); // Call the API to delete the payroll
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

export default useDeletePayroll;
