// useViewPurchase.ts
import { useQuery } from "react-query";
import { getPurchaseByOrderNumber } from "../helpers/apiFunctions";
import { Purchases } from "../types/db";
import { App } from "antd";
import { purchasesKeys } from "../constants/QUERY_KEYS";
import { useState } from "react";

interface HookReturn {
  purchase: Purchases | undefined;
  isLoading: boolean;
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

interface Props {
  orderNumber: string;
}

function useViewPurchase({ orderNumber }: Props): HookReturn {
  const { message } = App.useApp();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const { data: purchase, isLoading } = useQuery({
    queryKey: [purchasesKeys.getPurchaseByOrderNumber, orderNumber],
    queryFn: async (): Promise<Purchases> => {
      const sale = await getPurchaseByOrderNumber(orderNumber);
      return sale;
    },
    onError: () => {
      message.error("Failed to Purchase");
    },
  });

  return {
    purchase,
    isLoading,
    handleOpenModal,
    handleCloseModal,
    isModalOpen,
  };
}

export default useViewPurchase;
