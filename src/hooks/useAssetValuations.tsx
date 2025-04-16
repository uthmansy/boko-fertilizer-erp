import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
  useQuery,
} from "react-query";
import { getAllStocks, getAssetValuations } from "../helpers/apiFunctions";
import { StocksJoined } from "../types/db";
import { App } from "antd";
import { assetValuationsKeys, stocksKeys } from "../constants/QUERY_KEYS";
import useAuthStore from "../store/auth";

interface HookReturn {
  stocks: StocksJoined[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<StocksJoined[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
  allStocks: StocksJoined[];
  isLoadingAllStocks: boolean;
}

function useAssetValuations(): HookReturn {
  const { message } = App.useApp();
  const { userProfile } = useAuthStore();

  const fetchData = async ({ pageParam = 1 }) => {
    let isAdmin: boolean = userProfile?.role === "SUPER ADMIN";
    const stocks = await getAssetValuations({
      pageParam,
      warehouseFilter: isAdmin ? null : userProfile?.warehouse,
    });
    return stocks;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery([assetValuationsKeys.getAssetValuations], fetchData, {
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

  const { data: allStocks = [], isLoading: isLoadingAllStocks } = useQuery({
    queryKey: stocksKeys.getAllStocks,
    queryFn: async () => {
      const data = await getAllStocks();
      return data;
    },
    onError: () => message.error("Failed to load Stats"),
  });

  const stocks = data?.pages.flatMap((page) => page) || [];

  return {
    stocks,
    allStocks,
    isLoadingAllStocks,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useAssetValuations; // Export updated hook name
