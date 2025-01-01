import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getEmployees } from "../helpers/apiFunctions";
import { Employees } from "../types/db";
import { App } from "antd";
import { employeesKeys } from "../constants/QUERY_KEYS";

interface HookReturn {
  employees: Employees[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<Employees[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

function useAllEmployees(): HookReturn {
  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const employees = await getEmployees(pageParam);
    return employees;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(employeesKeys.getAllEmployees, fetchData, {
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

  const employees = data?.pages.flatMap((page) => page);

  return {
    employees: employees || [],
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useAllEmployees;
