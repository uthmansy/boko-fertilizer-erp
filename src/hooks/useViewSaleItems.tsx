// useViewSaleItems.ts
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getAllSaleItems } from "../helpers/apiFunctions";
import { SalesItemsJoined } from "../types/db";
import { App } from "antd";
import { salesKeys } from "../constants/QUERY_KEYS";
import { useState } from "react";

interface HookReturn {
  items: SalesItemsJoined[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<SalesItemsJoined[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

interface Props {
  saleId: string;
}

function useViewSaleItems({ saleId }: Props): HookReturn {
  const { message } = App.useApp();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const fetchData = async ({ pageParam = 1 }) => {
    const salesItems = await getAllSaleItems(pageParam, saleId);
    return salesItems;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery([salesKeys.getSaleItems, saleId], fetchData, {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 50) return allPages.length + 1;
      return undefined;
    },
    onError: (error) => message.error(error as string),
    enabled: isModalOpen, // Only fetch when modal is open
  });

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

export default useViewSaleItems;
