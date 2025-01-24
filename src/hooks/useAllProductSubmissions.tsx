import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getAllProductSubmissions } from "../helpers/apiFunctions";
import { ProductSubmission, ProductSubmissionWithDetails } from "../types/db";
import { App } from "antd";
import { productSubmissionsKeys } from "../constants/QUERY_KEYS";
import useAuthStore from "../store/auth";

interface HookReturn {
  productSubmissions: ProductSubmissionWithDetails[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<ProductSubmission[], unknown>>;
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

function useAllProductSubmissions({
  dateFilter,
  itemFilter,
  warehouseFilter,
  shiftFilter,
}: Props): HookReturn {
  const { message } = App.useApp();
  const { userProfile } = useAuthStore();

  const fetchData = async ({ pageParam = 1 }) => {
    let isAdmin: boolean = userProfile?.role === "SUPER ADMIN";
    const productSubmissions = await getAllProductSubmissions({
      pageParam,
      warehouseFilter: isAdmin ? warehouseFilter : userProfile?.warehouse,
      itemFilter,
      dateFilter,
      shiftFilter,
    });
    return productSubmissions;
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
      productSubmissionsKeys.getAllSubmissions,
      dateFilter,
      itemFilter,
      warehouseFilter,
      shiftFilter,
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
