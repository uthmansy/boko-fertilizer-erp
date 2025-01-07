import { useQuery } from "react-query";
import { getAllPaymentAccounts } from "../helpers/apiFunctions"; // Update to accounts API function
import { PaymentAccounts } from "../types/db"; // Update to accounts type
import { App } from "antd";
import { accountsKeys } from "../constants/QUERY_KEYS"; // Update to accounts query keys

interface HookReturn {
  accounts: PaymentAccounts[];
  isLoading: boolean;
  isRefetching: boolean;
}

function useAllAccounts(): HookReturn {
  const { message } = App.useApp();

  const {
    data: accounts,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: [accountsKeys.getAll],
    queryFn: getAllPaymentAccounts,
    onError: (error) => {
      message.error(error as string);
    },
  });

  return {
    accounts: accounts || [],
    isLoading,
    isRefetching,
  };
}

export default useAllAccounts;
