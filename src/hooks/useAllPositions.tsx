import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getPositions } from "../helpers/apiFunctions"; // Updated import for positions
import { Positions } from "../types/db"; // Updated type import
import { App } from "antd";
import { positionsKeys } from "../constants/QUERY_KEYS"; // Updated query keys import

interface HookReturn {
  positions: Positions[]; // Updated type
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<Positions[], unknown>>; // Updated type
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

function useAllPositions(): HookReturn {
  // Updated hook name
  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const positions = await getPositions(pageParam); // Updated function call
    return positions;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(positionsKeys.getPositions, fetchData, {
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

  const positions = data?.pages?.flatMap((page) => page) ?? []; // Updated variable

  return {
    positions: positions,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useAllPositions;
