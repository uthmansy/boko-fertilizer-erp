import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getEnrollments } from "../helpers/apiFunctions"; // Updated import for enrollments
import { Enrollment } from "../types/db"; // Updated type import
import { App } from "antd";
import { enrollmentKeys } from "../constants/QUERY_KEYS"; // Updated query keys import
import { useEffect } from "react";

interface HookReturn {
  enrollment: Enrollment[]; // Updated type
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<Enrollment[], unknown>>; // Updated type
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

function useAllEnrollment(): HookReturn {
  // Updated hook name
  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const enrollments = await getEnrollments(pageParam); // Updated function call
    return enrollments;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(enrollmentKeys.getEnrollments, fetchData, {
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

  const enrollment = data?.pages?.flatMap((page) => page) ?? []; // Updated variable

  return {
    enrollment,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useAllEnrollment;
