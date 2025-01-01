import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { ProductSubmission } from "../types/db"; // Update to ProductSubmission type
import { deleteSubmission } from "../helpers/apiFunctions"; // Update to your API function for deleting submissions

interface Props {
  submission: ProductSubmission; // Update to ProductSubmission type
}

function useDeleteSubmission({ submission }: Props) {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (resolve: (value: unknown) => void) => {
      try {
        await deleteSubmission(submission.id); // Call the API to delete the submission
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
      queryClient.invalidateQueries(); // Update to appropriate query key
    },
  });

  return {
    handleSubmit,
    isLoading,
  };
}

export default useDeleteSubmission;
