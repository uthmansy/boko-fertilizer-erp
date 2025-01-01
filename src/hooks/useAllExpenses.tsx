import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getExpenses } from "../helpers/apiFunctions"; // Updated import for expenses
import { Expenses } from "../types/db"; // Updated type import
import { App } from "antd";
import { expensesKeys } from "../constants/QUERY_KEYS"; // Updated query keys import
import { useEffect, useState } from "react";
import { FieldConfig } from "../types/comps";

interface HookReturn {
  expenses: Expenses[]; // Updated type
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<Expenses[], unknown>>; // Updated type
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
  filterFormConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
}

function useAllExpenses(): HookReturn {
  // Updated hook name
  const { message } = App.useApp();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchData = async ({ pageParam = 1 }) => {
    const expenses = await getExpenses(pageParam, searchTerm); // Updated function call
    return expenses;
  };

  const filterFormConfig: FieldConfig[] = [
    {
      name: "search",
      label: "Search By Truck Number",
      type: "search",
      noLabel: true,
      required: false,
      onSearch: (value) => {
        setSearchTerm(value);
      },
    },
  ];

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
  } = useInfiniteQuery([expensesKeys.getExpenses, searchTerm], fetchData, {
    // Updated query key
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

  const expenses = data?.pages?.flatMap((page) => page) ?? []; // Updated variable

  return {
    expenses: expenses,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
    filterFormConfig,
    handleSubmit,
  };
}

export default useAllExpenses;
