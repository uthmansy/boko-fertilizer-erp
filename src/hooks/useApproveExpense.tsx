import { useState } from "react";
import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";

import useAuthStore from "../store/auth";
import { Expenses, UpdateExpenses } from "../types/db"; // Adjust this to match the type for expense data
import { approveExpense } from "../helpers/apiFunctions"; // Adjust this to match the function for approving an expense

interface Props {
  expense: Expenses;
}

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleSubmit: (resolve: (value: unknown) => void) => void;
  isLoading: boolean;
}

function useApproveExpense({ expense }: Props): HookReturn {
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
        const payload: UpdateExpenses = {
          approved_by: userProfile?.username,
          approved: true,
          id: expense.id,
        };
        await approveExpense(payload);
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
      queryClient.invalidateQueries();
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

export default useApproveExpense;
