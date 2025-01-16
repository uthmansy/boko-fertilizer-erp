import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getAllSalesPayments } from "../helpers/apiFunctions"; // Use the appropriate API function for sales payments
import { SalesPayments } from "../types/db"; // Use the appropriate type for sales payments
import { App } from "antd";
import { salesKeys } from "../constants/QUERY_KEYS"; // Use the appropriate query key for sales payments
import { useState } from "react";

interface HookReturn {
  payments: SalesPayments[]; // Change to SalesPayments[]
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<SalesPayments[], unknown>>; // Change to SalesPayments[]
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

interface Props {
  orderNumber: string;
}

function useViewSalesPayments({ orderNumber }: Props): HookReturn {
  // Change function name to useViewSalesPayments
  const { message } = App.useApp();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async ({ pageParam = 1 }) => {
    const salesPayments = await getAllSalesPayments(pageParam, orderNumber); // Use the sales payments API function
    return salesPayments;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(
    [salesKeys.getSalePayments, orderNumber], // Use the sales payments query key
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

  const payments = data?.pages.flatMap((page) => page);

  return {
    payments: payments || [],
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
  };
}

export default useViewSalesPayments; // Export the updated hook
