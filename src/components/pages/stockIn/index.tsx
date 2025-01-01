import RefreshButton from "../../RefreshButton";
import { stockInKeys } from "../../../constants/QUERY_KEYS";
import AddNew from "./AddNew";
import AllStockIns from "./AllStockIns";
import useAuthStore from "../../../store/auth";

function StockIn() {
  const { userProfile } = useAuthStore();
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={stockInKeys.getAll} />
        {(userProfile?.role === "SUPER ADMIN" ||
          userProfile?.role === "ADMIN" ||
          userProfile?.role === "INVENTORY") && <AddNew />}
      </div>
      <AllStockIns />
    </>
  );
}

export default StockIn;
