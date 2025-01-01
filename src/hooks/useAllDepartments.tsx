import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getDepartments } from "../helpers/apiFunctions"; // Updated import for departments
import { Departments } from "../types/db"; // Updated type import
import { App } from "antd";
import { departmentsKeys } from "../constants/QUERY_KEYS"; // Updated query keys import
import { useEffect } from "react";

interface HookReturn {
  departments: Departments[]; // Updated type
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<Departments[], unknown>>; // Updated type
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

function useAllDepartments(): HookReturn {
  // Updated hook name
  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const departments = await getDepartments(pageParam); // Updated function call
    return departments;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(departmentsKeys.getDepartments, fetchData, {
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

  const departments = data?.pages?.flatMap((page) => page) ?? []; // Updated variable

  return {
    departments: departments,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useAllDepartments;
