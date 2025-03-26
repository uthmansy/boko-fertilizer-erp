import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getEmployeeBonuses } from "../helpers/apiFunctions";
import { App } from "antd";
import { payrollBonusKeys } from "../constants/QUERY_KEYS";
import { PayrollBonus } from "../zodSchemas/payrollBonuses";

interface HookReturn {
  bonuses: PayrollBonus[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<PayrollBonus[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

interface Props {
  payrollId: string;
}

function useAllBonuses({ payrollId }: Props): HookReturn {
  // Updated hook name
  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const bonuses = await getEmployeeBonuses({
      pageParam,
      payrollId,
    });
    return bonuses;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(
    [payrollBonusKeys.getEmployeeBonuses, payrollId],
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

  const bonuses = data?.pages.flatMap((page) => page) || [];

  return {
    bonuses,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useAllBonuses; // Export updated hook name
