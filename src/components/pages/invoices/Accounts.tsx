import { accountsKeys } from "../../../constants/QUERY_KEYS";
import useAuthStore from "../../../store/auth";
import RefreshButton from "../../RefreshButton";
import AddNewAccount from "./AddNewAccount";
import AllAccounts from "./AllAccounts";

function Accounts() {
  const { userProfile } = useAuthStore();
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={accountsKeys.getAll} />
        {(userProfile?.role === "SUPER ADMIN" ||
          userProfile?.role === "ADMIN" ||
          userProfile?.role === "ACCOUNTING") && <AddNewAccount />}
      </div>
      <AllAccounts />
    </>
  );
}

export default Accounts;
