import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getPurchasePayments } from "../helpers/apiFunctions"; // Updated import for expenses
import { PurchasePaymentsJoined } from "../types/db"; // Updated type import
import { App } from "antd";
import { purchasePaymentsKeys } from "../constants/QUERY_KEYS"; // Updated query keys import
import { useEffect } from "react";

interface HookReturn {
  purchasePayments: PurchasePaymentsJoined[]; // Updated type
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<PurchasePaymentsJoined[], unknown>>; // Updated type
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

function useAllPurchasePayments(): HookReturn {
  // Updated hook name
  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const purchasePayments = await getPurchasePayments(pageParam); // Updated function call
    return purchasePayments;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery([purchasePaymentsKeys.getAll], fetchData, {
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

  useEffect(() => {
    console.log(data);
  }, [data]);

  const purchasePayments = data?.pages?.flatMap((page) => page) ?? []; // Updated variable

  return {
    purchasePayments: purchasePayments,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useAllPurchasePayments;
