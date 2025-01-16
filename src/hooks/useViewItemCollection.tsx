import { useState } from "react";
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getSubItems } from "../helpers/apiFunctions";
import { inventoryItemsKeys } from "../constants/QUERY_KEYS";
import { App } from "antd";
import { SubItemsWithDetails } from "../types/db";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  items: SubItemsWithDetails[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<SubItemsWithDetails[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

interface Props {
  parentItem: string;
}

function useViewItemCollection({ parentItem }: Props): HookReturn {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const items = await getSubItems(pageParam, parentItem);
    return items;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(
    [inventoryItemsKeys.getItemSubItemsPaginated, parentItem],
    fetchData,
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 50) {
          return allPages.length + 1; // Increment page number
        }
        return undefined; // No more pages to fetch
      },
      onError: (error) => {
        message.error(error as string);
      },
    }
  );

  const items = data?.pages?.flatMap((page) => page);

  return {
    isModalOpen,
    handleCloseModal,
    handleOpenModal,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    items: items || [],
  };
}

export default useViewItemCollection;
