import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
  useQuery,
} from "react-query";
import { SalesAndPayments } from "../types/db"; // Updated type import
import { App } from "antd";
import { receivablesKeys } from "../constants/QUERY_KEYS"; // Updated query keys import
import { useEffect } from "react";
import { getAllSales, getTotalSalesReceivables } from "../helpers/apiFunctions";
import useAuthStore from "../store/auth";

interface HookReturn {
  receivables: SalesAndPayments[]; // Updated type
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<SalesAndPayments[], unknown>>; // Updated type
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
  salesPaymentsBalanceSum: number | undefined;
}

function useReceivables(): HookReturn {
  // Updated hook name
  const { message } = App.useApp();
  const { userProfile } = useAuthStore();

  const fetchData = async ({ pageParam = 1 }) => {
    let isAdmin: boolean =
      userProfile?.role === "SUPER ADMIN" || userProfile?.role === "ADMIN";
    const receivables = await getAllSales(
      pageParam,
      isAdmin || userProfile?.role === "ACCOUNTING",
      userProfile?.warehouse,
      true
    ); // Updated function call
    return receivables;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery([receivablesKeys.getAll], fetchData, {
    // Updated query key
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 50) {
        return allPages.length + 1; // Increment page number
      }
      return undefined; // No more pages to fetch
    },
    onError: () => {
      message.error("error loading receivables");
    },
  });

  const { data: salesPaymentsBalanceSum } = useQuery({
    queryKey: [receivablesKeys.getSalesSum],
    queryFn: getTotalSalesReceivables,
    onError: () => {
      message.error("error loading sales balance sum");
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const receivables = data?.pages?.flatMap((page) => page) ?? []; // Updated variable

  return {
    receivables: receivables,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
    salesPaymentsBalanceSum,
  };
}

export default useReceivables;
