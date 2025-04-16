import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getItemProductionInflow } from "../helpers/apiFunctions";
import { App } from "antd";
import { requestsKeys } from "../constants/QUERY_KEYS";
import useAuthStore from "../store/auth";

export interface ItemInflowType {
  date: string;
  item: string;
  total_quantity: number;
}

interface HookReturn {
  inflow: ItemInflowType[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<ItemInflowType[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

interface Props {
  dateFilter: string | null;
  warehouseFilter: string | null;
  shiftFilter: string | null;
  itemFilter: string | null;
}

function useItemRequestInflow({
  dateFilter,
  warehouseFilter,
  shiftFilter,
  itemFilter,
}: Props): HookReturn {
  const { message } = App.useApp();
  const { userProfile } = useAuthStore();

  const fetchData = async ({ pageParam = 1 }) => {
    let isAdmin: boolean = userProfile?.role === "SUPER ADMIN";
    const inflow = await getItemProductionInflow({
      pageParam,
      warehouseFilter: isAdmin ? warehouseFilter : userProfile?.warehouse,
      dateFilter,
      itemFilter,
    });
    return inflow;
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
      requestsKeys.getItemProductionInflow,
      dateFilter,
      warehouseFilter,
      shiftFilter,
      itemFilter,
    ],
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

  const inflow = data?.pages.flatMap((page) => page) || [];

  return {
    inflow,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useItemRequestInflow;
