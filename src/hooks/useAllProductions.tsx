import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getAllProductions } from "../helpers/apiFunctions"; // Update to the API function for productions
import { ProductionWithItems } from "../types/db"; // Update type to reflect production data
import { App } from "antd";
import { productionsKeys } from "../constants/QUERY_KEYS"; // Update query keys to productions
import useAuthStore from "../store/auth";

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

interface Props {
  dateFilter: string | null;
  itemFilter: string | null;
  warehouseFilter: string | null;
  shiftFilter: string | null;
  monthFilter: number | null;
  yearFilter: number | null;
}

function useAllProductions({
  dateFilter,
  itemFilter,
  warehouseFilter,
  shiftFilter,
  monthFilter,
  yearFilter,
}: Props): HookReturn {
  const { message } = App.useApp();
  const { userProfile } = useAuthStore();

  const fetchData = async ({ pageParam = 1 }) => {
    let isAdmin: boolean = userProfile?.role === "SUPER ADMIN";
    const productions = await getAllProductions({
      pageParam,
      warehouseFilter: isAdmin ? warehouseFilter : userProfile?.warehouse,
      itemFilter,
      dateFilter,
      shiftFilter,
      monthFilter,
      yearFilter,
    }); // Fetch production data
    return productions;
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
      productionsKeys.getAllProductions,
      dateFilter,
      itemFilter,
      warehouseFilter,
      shiftFilter,
      monthFilter,
      yearFilter,
    ],
    fetchData,
    {
      // Use productions keys
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
