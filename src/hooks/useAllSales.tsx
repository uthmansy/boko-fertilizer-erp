import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getAllSales } from "../helpers/apiFunctions"; // Update to sales API function
import { SalesAndPayments } from "../types/db"; // Update to sales type
import { App } from "antd";
import { salesKeys } from "../constants/QUERY_KEYS"; // Update to sales query keys
import useAuthStore from "../store/auth";

interface HookReturn {
  sales: SalesAndPayments[]; // Update to Sales array
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<SalesAndPayments[], unknown>>; // Update to Sales type
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

function useAllSales(): HookReturn {
  // Updated hook name
  const { message } = App.useApp();
  const { userProfile } = useAuthStore();

  const fetchData = async ({ pageParam = 1 }) => {
    let isAdmin: boolean =
      userProfile?.role === "SUPER ADMIN" || userProfile?.role === "ADMIN";
    const sales = await getAllSales(pageParam, isAdmin, userProfile?.warehouse); // Update to sales API function
    return sales;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(salesKeys.getAllSales, fetchData, {
    // Update to sales query keys
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

  const sales = data?.pages.flatMap((page) => page);

  return {
    sales: sales || [], // Update to Sales array
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useAllSales; // Export updated hook name
