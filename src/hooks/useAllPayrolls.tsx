import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getPayrolls } from "../helpers/apiFunctions"; // Updated import for payrolls
import { PayrollsAndEmployees } from "../types/db"; // Updated type import
import { App } from "antd";
import { payrollKeys } from "../constants/QUERY_KEYS"; // Updated query keys import

interface HookReturn {
  payrolls: PayrollsAndEmployees[]; // Updated type
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<PayrollsAndEmployees[], unknown>>; // Updated type
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

function useAllPayrolls(): HookReturn {
  // Updated hook name
  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const payrolls = await getPayrolls(pageParam); // Updated function call
    return payrolls;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(payrollKeys.getPayrolls, fetchData, {
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

  const payrolls = data?.pages?.flatMap((page) => page) ?? []; // Updated variable

  return {
    payrolls: payrolls,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useAllPayrolls;
