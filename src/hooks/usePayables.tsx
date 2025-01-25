import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
  useQuery,
} from "react-query";
import {
  getAllStockPurchases,
  getTotalPurchasesPayables,
} from "../helpers/apiFunctions"; // Updated import for expenses
import { Purchases } from "../types/db"; // Updated type import
import { App } from "antd";
import { payablesKeys } from "../constants/QUERY_KEYS"; // Updated query keys import
import { useEffect } from "react";

interface HookReturn {
  payables: Purchases[]; // Updated type
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<Purchases[], unknown>>; // Updated type
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
  purchasePaymentsBalanceSum: number | undefined;
}

function usePayables(): HookReturn {
  // Updated hook name
  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const payables = await getAllStockPurchases({ pageParam }); // Updated function call
    return payables;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery([payablesKeys.getAll], fetchData, {
    // Updated query key
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 50) {
        return allPages.length + 1; // Increment page number
      }
      return undefined; // No more pages to fetch
    },
    onError: (error) => {
      message.error(error as string);
    },
  });

  const { data: purchasePaymentsBalanceSum } = useQuery({
    queryKey: [payablesKeys.getPurchasePaymentsBalanceSum],
    queryFn: getTotalPurchasesPayables,
    onError: () => {
      message.error("error loading sales balance sum");
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const payables = data?.pages?.flatMap((page) => page) ?? []; // Updated variable

  return {
    payables: payables,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
    purchasePaymentsBalanceSum,
  };
}

export default usePayables;
