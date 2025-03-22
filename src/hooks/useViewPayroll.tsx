import { App } from "antd";
import { useState } from "react";
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { payrollKeys } from "../constants/QUERY_KEYS";
import { getPayrollEmployees } from "../helpers/apiFunctions";
import { EmployeePayrollJoined } from "../types/db";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  isLoading: boolean;
  payroll: EmployeePayrollJoined[]; // Updated type
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<EmployeePayrollJoined[], unknown>>; // Updated type
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

interface Props {
  payrollId: string;
}

function useViewPayroll({ payrollId }: Props): HookReturn {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const payrolls = await getPayrollEmployees({
      pageNumber: pageParam,
      payrollId,
    }); // Updated function call
    return payrolls;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(
    [payrollKeys.getPayrollEmployeesPaginated, payrollId],
    fetchData,
    {
      // Updated query key
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 50) {
          return allPages.length + 1; // Increment page number
        }
        return undefined; // No more pages to fetch
      },
      onError: (error) => {
        message.error(error as string);
      },
      enabled: isModalOpen,
    }
  );

  const payroll = data?.pages?.flatMap((page) => page) ?? []; // Updated variable

  return {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    payroll,
  };
}

export default useViewPayroll; // Export the updated hook
