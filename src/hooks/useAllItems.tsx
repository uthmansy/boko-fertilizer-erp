import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
  useQueryClient,
} from "react-query";
import { getAllInventoryItems } from "../helpers/apiFunctions";
import { InventoryItems } from "../types/db";
import { App } from "antd";
import { inventoryItemsKeys } from "../constants/QUERY_KEYS";
import { useState } from "react";

interface HookReturn {
  items: InventoryItems[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<InventoryItems[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
  handleSearchByName: (value: any) => void;
  resetFilters: (value: any) => void;
}

function useAllItems(): HookReturn {
  const { message } = App.useApp();
  const [searchByName, setSearchByName] = useState<string | null>();
  const queryClient = useQueryClient();

  const handleSearchByName = (value: any) => {
    setSearchByName(value.target.value);
  };

  const resetFilters = () => {
    setSearchByName(null);
    queryClient.invalidateQueries(
      inventoryItemsKeys.getAllInventoryItemsPaginated
    );
  };

  const fetchData = async ({ pageParam = 1 }) => {
    const items = await getAllInventoryItems(pageParam, searchByName);
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
    [inventoryItemsKeys.getAllInventoryItemsPaginated, searchByName],
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
    items: items || [],
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
    handleSearchByName,
    resetFilters,
  };
}

export default useAllItems;
