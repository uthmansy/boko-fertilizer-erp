// useViewSale.ts
import { useQuery } from "react-query";
import { getSaleByOrderNumber } from "../helpers/apiFunctions";
import { SalesWithCustomers } from "../types/db";
import { App } from "antd";
import { salesKeys } from "../constants/QUERY_KEYS";
import { useState } from "react";

interface HookReturn {
  sale: SalesWithCustomers | undefined;
  isLoading: boolean;
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

interface Props {
  orderNumber: string;
}

function useViewSale({ orderNumber }: Props): HookReturn {
  const { message } = App.useApp();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const { data: sale, isLoading } = useQuery({
    queryKey: [salesKeys.getSaleByOrderNumber, orderNumber],
    queryFn: async (): Promise<SalesWithCustomers> => {
      const sale = await getSaleByOrderNumber(orderNumber);
      return sale;
    },
    onError: () => {
      message.error("Failed to Sale");
    },
  });

  return {
    sale,
    isLoading,
    handleOpenModal,
    handleCloseModal,
    isModalOpen,
  };
}

export default useViewSale;
