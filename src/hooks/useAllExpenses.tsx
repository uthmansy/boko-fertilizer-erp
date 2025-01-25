import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getExpenses } from "../helpers/apiFunctions"; // Updated import for expenses
import { Expenses } from "../types/db"; // Updated type import
import { App } from "antd";
import { expensesKeys } from "../constants/QUERY_KEYS"; // Updated query keys import
import { useEffect } from "react";
import useAuthStore from "../store/auth";

interface HookReturn {
  expenses: Expenses[]; // Updated type
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<Expenses[], unknown>>; // Updated type
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
  handleSubmit: (values: any) => void;
}

interface Props {
  debouncedSearchTerm: string;
  dateFilter: string | null;
  warehouseFilter: string | null;
  expenseCategoryFilter: string | null;
}

function useAllExpenses({
  dateFilter,
  debouncedSearchTerm,
  warehouseFilter,
  expenseCategoryFilter,
}: Props): HookReturn {
  // Updated hook name
  const { message } = App.useApp();
  const { userProfile } = useAuthStore();

  const fetchData = async ({ pageParam = 1 }) => {
    let isAdmin: boolean = userProfile?.role === "SUPER ADMIN";
    const expenses = await getExpenses({
      pageParam,
      warehouseFilter: isAdmin ? warehouseFilter : userProfile?.warehouse,
      debouncedSearchTerm,
      expenseCategoryFilter,
      dateFilter,
    }); // Updated function call
    return expenses;
  };

  const handleSubmit = () => {
    // setSearchTerm(values.search);
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(
    [
      expensesKeys.getExpenses,
      dateFilter,
      debouncedSearchTerm,
      expenseCategoryFilter,
      warehouseFilter,
    ],
    fetchData,
    {
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
    }
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  const expenses = data?.pages?.flatMap((page) => page) ?? []; // Updated variable

  return {
    expenses: expenses,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
    handleSubmit,
  };
}

export default useAllExpenses;
