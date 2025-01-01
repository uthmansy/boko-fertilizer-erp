import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getAllStockIns } from "../helpers/apiFunctions";
import { StockInWithDetails } from "../types/db";
import { App } from "antd";
import { stockInKeys } from "../constants/QUERY_KEYS";

interface HookReturn {
  stockIns: StockInWithDetails[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<StockInWithDetails[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

function useAllStockIns(): HookReturn {
  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const items = await getAllStockIns(pageParam);
    return items;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(stockInKeys.getAll, fetchData, {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 10) {
        return allPages.length + 1; // Increment page number
      }
      return undefined; // No more pages to fetch
    },
    onError: (error) => {
      message.error(error as string);
    },
  });

  const stockIns = data?.pages?.flatMap((page) => page);

  return {
    stockIns: stockIns || [],
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useAllStockIns;
