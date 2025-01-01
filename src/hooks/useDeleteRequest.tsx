import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { RequestWithItems } from "../types/db";
import { deleteRequest } from "../helpers/apiFunctions"; // This should be your API function to delete a request

interface Props {
  request: RequestWithItems;
}

function useDeleteRequest({ request }: Props) {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (resolve: (value: unknown) => void) => {
      try {
        await deleteRequest(request.id); // Call the API to delete the request
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

export default useDeleteRequest;
