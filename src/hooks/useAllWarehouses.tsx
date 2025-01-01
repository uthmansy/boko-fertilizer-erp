import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getAllWarehouses } from "../helpers/apiFunctions";
import { Warehouses } from "../types/db";
import { App } from "antd";
import { warehousesKeys } from "../constants/QUERY_KEYS";
import { useEffect } from "react";

interface HookReturn {
  warehouses: Warehouses[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<Warehouses[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

function useAllWarehouses(): HookReturn {
  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const warehouses = await getAllWarehouses(pageParam);
    return warehouses;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(warehousesKeys.getAllWarehousesPaginated, fetchData, {
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

  useEffect(() => {
    console.log(data);
  }, [data]);

  const warehouses = data?.pages?.flatMap((page) => page) ?? [];

  return {
    warehouses: warehouses,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useAllWarehouses;
