import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getAllPurchasePayments } from "../helpers/apiFunctions";
import { PurchasePayments } from "../types/db";
import { App } from "antd";
import { purchasesKeys } from "../constants/QUERY_KEYS";
import { useState } from "react";

interface HookReturn {
  payments: PurchasePayments[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<PurchasePayments[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

interface Props {
  orderNumber: string;
}

function useViewPurchasePayments({ orderNumber }: Props): HookReturn {
  const { message } = App.useApp();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async ({ pageParam = 1 }) => {
    const purchasePayments = await getAllPurchasePayments(
      pageParam,
      orderNumber
    );
    return purchasePayments;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(
    [purchasesKeys.getPurchasePayments, orderNumber],
    fetchData,
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 10) {
          return allPages.length + 1; // Increment page number
        }
        return undefined; // No more pages to fetch
      },
      onError: (error) => {
        message.error(error as string);
      },
    }
  );

  const payments = data?.pages.flatMap((page) => page);

  return {
    payments: payments || [],
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
  };
}

export default useViewPurchasePayments;
