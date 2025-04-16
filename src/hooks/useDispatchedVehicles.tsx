import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getVehicles } from "../helpers/apiFunctions";
import { VehiclesAndDestination } from "../types/db";
import { App } from "antd";
import { vehiclesKeys } from "../constants/QUERY_KEYS";

interface HookReturn {
  vehicles: VehiclesAndDestination[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<VehiclesAndDestination[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

interface Props {
  debouncedSearchTerm: string;
  dateFilter: string | null;
  itemFilter: string | null;
  warehouseFilter: string | null;
  monthFilter: number | null;
  yearFilter: number | null;
}

function useDispatchedVehicles({
  dateFilter,
  debouncedSearchTerm,
  itemFilter,
  monthFilter,
  warehouseFilter,
  yearFilter,
}: Props): HookReturn {
  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const vehicles = await getVehicles("delivered", {
      pageParam,
      dateFilter,
      debouncedSearchTerm,
      itemFilter,
      yearFilter,
      monthFilter,
      warehouseFilter,
    });
    return vehicles;
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
      vehiclesKeys.getDispatchedVehicles,
      dateFilter,
      debouncedSearchTerm,
      itemFilter,
      monthFilter,
      warehouseFilter,
      yearFilter,
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

  const vehicles = data?.pages.flatMap((page) => page);

  return {
    vehicles: vehicles || [],
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
    // filterFormConfig,
    // handleSubmit,
  };
}

export default useDispatchedVehicles; // Updated the export
