import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getItemProductionInflow } from "../helpers/apiFunctions";
import { App } from "antd";
import { requestsKeys } from "../constants/QUERY_KEYS";
import useAuthStore from "../store/auth";
import { InventoryItems } from "../types/db";

export interface ItemInflowType {
  date: string;
  item: string;
  total_quantity: number;
  item_data: InventoryItems;
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
  itemFilter: string | null;
  monthFilter: number | null;
  yearFilter: number | null;
}

function useItemRequestInflow({
  dateFilter,
  warehouseFilter,
  itemFilter,
  monthFilter,
  yearFilter,
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
      yearFilter,
      monthFilter,
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
      itemFilter,
      yearFilter,
      monthFilter,
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
