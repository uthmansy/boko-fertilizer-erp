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

interface Props {
  dateFilter: string | null;
  warehouseFilter: string | null;
  shiftFilter: string | null;
}

function useAllRequests({
  dateFilter,
  warehouseFilter,
  shiftFilter,
}: Props): HookReturn {
  const { message } = App.useApp();
  const { userProfile } = useAuthStore();

  const fetchData = async ({ pageParam = 1 }) => {
    let isAdmin: boolean = userProfile?.role === "SUPER ADMIN";
    const requests = await getAllRequests({
      pageParam,
      warehouseFilter: isAdmin ? warehouseFilter : userProfile?.warehouse,
      dateFilter,
      shiftFilter,
    });
    return requests;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(
    [requestsKeys.getAllRequests, dateFilter, warehouseFilter, shiftFilter],
    fetchData,
    {
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
