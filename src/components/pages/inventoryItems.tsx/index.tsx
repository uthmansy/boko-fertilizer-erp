import RefreshButton from "../../RefreshButton";
import { inventoryItemsKeys } from "../../../constants/QUERY_KEYS";
import AddNew from "./AddNew";
import AllItems from "./AllItems";
import useAuthStore from "../../../store/auth";

function InventoryItems() {
  const { userProfile } = useAuthStore();
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={inventoryItemsKeys.getAllItems} />
        {(userProfile?.role === "SUPER ADMIN" ||
          userProfile?.role === "ADMIN" ||
          userProfile?.role === "MANAGER") && <AddNew />}
      </div>
      <AllItems />
    </>
  );
}

export default InventoryItems;
