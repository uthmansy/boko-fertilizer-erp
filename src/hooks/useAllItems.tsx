import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getAllInventoryItems } from "../helpers/apiFunctions";
import { InventoryItems } from "../types/db";
import { App } from "antd";
import { inventoryItemsKeys } from "../constants/QUERY_KEYS";

interface HookReturn {
  items: InventoryItems[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<InventoryItems[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

function useAllItems(): HookReturn {
  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const items = await getAllInventoryItems(pageParam);
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
    inventoryItemsKeys.getAllInventoryItemsPaginated,
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
  };
}

export default useAllItems;
