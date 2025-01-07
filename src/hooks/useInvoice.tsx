import { useQuery } from "react-query";
import { accountsKeys } from "../constants/QUERY_KEYS";
import { PaymentAccounts } from "../types/db";
import { App } from "antd";
import { getAllPaymentAccounts } from "../helpers/apiFunctions";
import { SelectOption } from "../types/comps";
import { useState } from "react";

interface HookReturn {
  accountsOption: SelectOption[];
  handleAccount: (value: string) => void;
  account: PaymentAccounts | null;
}

function useInvoice(): HookReturn {
  const { message } = App.useApp();

  const [account, setAccount] = useState<PaymentAccounts | null>(null);

  const { data: accounts } = useQuery({
    queryKey: accountsKeys.getAll,
    queryFn: async (): Promise<PaymentAccounts[]> => {
      const accounts = await getAllPaymentAccounts();
      return accounts;
    },
    onError: () => {
      message.error("Failed to Load Payment Accounts");
    },
  });

  const handleAccount = (value: string) => {
    setAccount(accounts?.find((account) => account.alias === value) || null);
  };

  const accountsOption: SelectOption[] =
    accounts?.map((account) => ({
      label: `${account.alias} ${account.bank_name} ${account.account_number}`,
      value: account.alias,
    })) || [];

  return { accountsOption, handleAccount, account };
}

export default useInvoice;
