import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getAllRequests } from "../helpers/apiFunctions";
import { RequestWithItems } from "../types/db";
import { App } from "antd";
import { requestsKeys } from "../constants/QUERY_KEYS";
import useAuthStore from "../store/auth";

interface HookReturn {
  requests: RequestWithItems[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<RequestWithItems[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

function useAllRequests(): HookReturn {
  const { message } = App.useApp();
  const { userProfile } = useAuthStore();

  const fetchData = async ({ pageParam = 1 }) => {
    const requests = await getAllRequests(
      pageParam,
      userProfile?.role === "SUPER ADMIN" ? null : userProfile?.warehouse
    );
    return requests;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(requestsKeys.getAllRequests, fetchData, {
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

  const requests = data?.pages.flatMap((page) => page);

  return {
    requests: requests || [],
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useAllRequests;
