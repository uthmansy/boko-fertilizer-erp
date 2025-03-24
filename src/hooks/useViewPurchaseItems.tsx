// useViewPurchaseItems.ts
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getAllPurchaseItems } from "../helpers/apiFunctions";
import { App } from "antd";
import { purchasesKeys } from "../constants/QUERY_KEYS";
import { useState } from "react";
import { PurchaseItemsJoined } from "../types/db";

interface HookReturn {
  items: PurchaseItemsJoined[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<PurchaseItemsJoined[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

interface Props {
  purchaseId: string | undefined;
  execQuery?: boolean;
}

function useViewPurchaseItems({
  purchaseId,
  execQuery = false,
}: Props): HookReturn {
  const { message } = App.useApp();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const fetchData = async ({ pageParam = 1 }) => {
    if (purchaseId) {
      const purchaseItems = await getAllPurchaseItems(pageParam, purchaseId);
      return purchaseItems;
    }
    return [];
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(
    [purchasesKeys.getPurchaseItems, purchaseId],
    fetchData,
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 50) return allPages.length + 1;
        return undefined;
      },
      onError: (error) => message.error(error as string),
      enabled: isModalOpen || execQuery, // Only fetch when modal is open
    }
  );

  const items = data?.pages.flatMap((page) => page) || [];

  return {
    items,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    handleOpenModal,
    handleCloseModal,
    isModalOpen,
  };
}

export default useViewPurchaseItems;
