import { useState } from "react";
import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";

import useAuthStore from "../store/auth";
import { ProductSubmission, UpdateSubmission } from "../types/db"; // Update types
import { approveSubmission } from "../helpers/apiFunctions"; // Update function import
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

function useApproveSubmission({ submission }: Props): HookReturn {
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
          accepted_by: userProfile?.username,
          date_accepted: moment(Date.now()).format("YYYY-MM-DD"),
          status: "accepted",
          id: submission.id,
        };
        await approveSubmission(payload);
        resolve("approved");
      } catch (error) {
        if (error instanceof Error) {
          // Handle other types of errors
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
      message.success("Approved successfully");
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

export default useApproveSubmission;
