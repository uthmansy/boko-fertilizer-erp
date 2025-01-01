import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getAllProductions } from "../helpers/apiFunctions"; // Update to the API function for productions
import { ProductionWithItems } from "../types/db"; // Update type to reflect production data
import { App } from "antd";
import { productionsKeys } from "../constants/QUERY_KEYS"; // Update query keys to productions

interface HookReturn {
  productions: ProductionWithItems[]; // Update type here
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<ProductionWithItems[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

function useAllProductions(): HookReturn {
  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const productions = await getAllProductions(pageParam); // Fetch production data
    return productions;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(productionsKeys.getAllProductions, fetchData, {
    // Use productions keys
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

  const productions = data?.pages.flatMap((page) => page);

  return {
    productions: productions || [], // Update here
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useAllProductions;
