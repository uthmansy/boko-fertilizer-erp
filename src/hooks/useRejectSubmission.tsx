import { useState } from "react";
import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";

import useAuthStore from "../store/auth";
import { ProductSubmission, UpdateSubmission } from "../types/db"; // Update types
import { rejectSubmission } from "../helpers/apiFunctions"; // Update API function import
import moment from "moment";

interface Props {
  submission: ProductSubmission; // Update prop type
}

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleSubmit: (resolve: (value: unknown) => void) => void;
  isLoading: boolean;
}

function useRejectSubmission({ submission }: Props): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { userProfile } = useAuthStore();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (resolve: (value: unknown) => void) => {
      try {
        const payload: UpdateSubmission = {
          rejected_by: userProfile?.username,
          date_rejected: moment(Date.now()).format("YYYY-MM-DD"),
          status: "rejected",
          id: submission.id, // Update to use submission ID
        };
        await rejectSubmission(payload); // API call to handle rejection
        resolve("rejected");
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
      message.success("Rejected successfully");
      handleCloseModal();
      queryClient.invalidateQueries(); // Update query key
    },
  });

  return {
    isModalOpen,
    handleCloseModal,
    handleOpenModal,
    handleSubmit,
    isLoading,
  };
}

export default useRejectSubmission;
