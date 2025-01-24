import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getAllFinishedProducts } from "../helpers/apiFunctions"; // Update to the API function for finishedProducts
import { FinishedProductsJoint } from "../types/db"; // Update type to reflect production data
import { App } from "antd";
import { finishedProductsKeys } from "../constants/QUERY_KEYS"; // Update query keys to finishedProducts
import useAuthStore from "../store/auth";

interface HookReturn {
  finishedProducts: FinishedProductsJoint[]; // Update type here
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<FinishedProductsJoint[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

interface Props {
  dateFilter: string | null;
  itemFilter: string | null;
  warehouseFilter: string | null;
  shiftFilter: string | null;
}

function useAllFinishedProducts({
  dateFilter,
  itemFilter,
  warehouseFilter,
  shiftFilter,
}: Props): HookReturn {
  const { message } = App.useApp();
  const { userProfile } = useAuthStore();

  const fetchData = async ({ pageParam = 1 }) => {
    let isAdmin: boolean = userProfile?.role === "SUPER ADMIN";
    const finishedProducts = await getAllFinishedProducts({
      pageParam,
      warehouseFilter: isAdmin ? warehouseFilter : userProfile?.warehouse,
      itemFilter,
      dateFilter,
      shiftFilter,
    }); // Fetch production data
    return finishedProducts;
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
      finishedProductsKeys.getAll,
      dateFilter,
      itemFilter,
      warehouseFilter,
      shiftFilter,
    ],
    fetchData,
    {
      // Use finishedProducts keys
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

  const finishedProducts = data?.pages.flatMap((page) => page);

  return {
    finishedProducts: finishedProducts || [], // Update here
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useAllFinishedProducts;
