import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getEmployeeDeductions } from "../helpers/apiFunctions";
import { App } from "antd";
import { payrollDeductionKeys } from "../constants/QUERY_KEYS";
import { Deduction } from "../zodSchemas/payrollDeductions";

interface HookReturn {
  deductions: Deduction[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<Deduction[], unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

interface Props {
  payrollId: string;
}

function useAllDeductions({ payrollId }: Props): HookReturn {
  // Updated hook name
  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const deductions = await getEmployeeDeductions({
      pageParam,
      payrollId,
    });
    return deductions;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(
    [payrollDeductionKeys.getEmployeeDeductions, payrollId],
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

  const deductions = data?.pages.flatMap((page) => page) || [];

  return {
    deductions,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useAllDeductions; // Export updated hook name
