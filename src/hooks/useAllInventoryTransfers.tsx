import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getInventoryTransfers } from "../helpers/apiFunctions";
import { InventoryTransferWithStocks } from "../types/db";
import { App } from "antd";
import { inventoryTransfersKeys } from "../constants/QUERY_KEYS";

interface HookReturn {
  inventoryTransfers: InventoryTransferWithStocks[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<InventoryTransferWithStocks[], unknown>
  >;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

function useAllInventoryTransfers(): HookReturn {
  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const inventoryTransfers = await getInventoryTransfers(pageParam);
    return inventoryTransfers;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(
    inventoryTransfersKeys.getInventoryTransfersPaginated,
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

  const inventoryTransfers = data?.pages.flatMap((page) => page);

  return {
    inventoryTransfers: inventoryTransfers || [],
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useAllInventoryTransfers;
