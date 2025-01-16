import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getAllStockPurchases } from "../helpers/apiFunctions";
import { PurchasesAndPayments } from "../types/db";
import { App } from "antd";
import { purchasesKeys } from "../constants/QUERY_KEYS";
import { useState } from "react";
import dayjs from "dayjs";

interface HookReturn {
  purchases: PurchasesAndPayments[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<PurchasesAndPayments[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
  handleDateFilter: (value: any) => void;
  handleOrderNumberFilter: (value: any) => void;
  resetFilters: () => void;
}

function useAllPurchases(): HookReturn {
  const { message } = App.useApp();

  const [dateFilter, setDateFilter] = useState<string | null>();
  const [orderNumberFilter, setOrderNumberFilter] = useState<string | null>();

  const fetchData = async ({ pageParam = 1 }) => {
    const purchases = await getAllStockPurchases(
      pageParam,
      dateFilter,
      orderNumberFilter
    );
    return purchases;
  };

  const handleDateFilter = (value: dayjs.Dayjs) => {
    setDateFilter(value.format("YYYY-MM-DD"));
  };
  const handleOrderNumberFilter = (value: any) => {
    setOrderNumberFilter(value.target.value);
  };

  const resetFilters = () => {
    setDateFilter(null);
    setOrderNumberFilter(null);
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(
    [purchasesKeys.getAllPurchases, dateFilter, orderNumberFilter],
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

  const purchases = data?.pages.flatMap((page) => page);

  return {
    purchases: purchases || [],
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
    handleDateFilter,
    handleOrderNumberFilter,
    resetFilters,
  };
}

export default useAllPurchases;
