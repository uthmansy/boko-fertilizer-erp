import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getAllProductSubmissions } from "../helpers/apiFunctions";
import { ProductSubmission } from "../types/db";
import { App } from "antd";
import { productSubmissionsKeys } from "../constants/QUERY_KEYS";

interface HookReturn {
  productSubmissions: ProductSubmission[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<ProductSubmission[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

function useAllProductSubmissions(): HookReturn {
  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const productSubmissions = await getAllProductSubmissions(pageParam);
    return productSubmissions;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(productSubmissionsKeys.getAllSubmissions, fetchData, {
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

  const productSubmissions = data?.pages.flatMap((page) => page);

  return {
    productSubmissions: productSubmissions || [],
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useAllProductSubmissions;
