import { useState } from "react";
import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";

import useAuthStore from "../store/auth";
import { RequestWithItems, UpdateRequests } from "../types/db";
import { approveRequest } from "../helpers/apiFunctions";
import dayjs from "dayjs";

interface Props {
  request: RequestWithItems;
}

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleSubmit: (resolve: (value: unknown) => void) => void;
  isLoading: boolean;
}

function useMarkUsed({ request }: Props): HookReturn {
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
        const payload: UpdateRequests = {
          used_by: userProfile?.username,
          date_used: dayjs(Date.now()).format("YYYY-MM-DD"),
          used: true,
          id: request.id,
        };
        await approveRequest(payload);
        resolve("used");
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
      message.success("Used successfully");
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

export default useMarkUsed;
