import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getAllStockPurchases } from "../helpers/apiFunctions";
import { PurchasesAndPayments } from "../types/db";
import { App } from "antd";
import { purchasesKeys } from "../constants/QUERY_KEYS";

interface HookReturn {
  purchases: PurchasesAndPayments[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<PurchasesAndPayments[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

interface Props {
  debouncedSearchTerm: string;
  dateFilter: string | null;
  itemFilter: string | null;
}

function useAllPurchases({
  dateFilter,
  debouncedSearchTerm,
  itemFilter,
}: Props): HookReturn {
  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const purchases = await getAllStockPurchases({
      pageParam,
      dateFilter,
      debouncedSearchTerm,
      itemFilter,
    });
    return purchases;
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
      purchasesKeys.getAllPurchases,
      dateFilter,
      debouncedSearchTerm,
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

  const purchases = data?.pages.flatMap((page) => page);

  return {
    purchases: purchases || [],
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useAllPurchases;
