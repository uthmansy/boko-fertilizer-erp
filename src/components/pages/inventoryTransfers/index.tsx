import RefreshButton from "../../RefreshButton";
import { inventoryTransfersKeys } from "../../../constants/QUERY_KEYS";
import AddNew from "./AddNew";
import AllInventoryTransfers from "./AllInventoryTransfers";

function InventoryTransfers() {
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton
          queryKey={inventoryTransfersKeys.getInventoryTransfersPaginated}
        />
        <AddNew />
      </div>
      <AllInventoryTransfers />
    </>
  );
}

export default InventoryTransfers;
