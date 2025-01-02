import RefreshButton from "../../RefreshButton";
import { inventoryTransfersKeys } from "../../../constants/QUERY_KEYS";
import AddNew from "./AddNew";
import AllInventoryTransfers from "./AllInventoryTransfers";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

function InventoryTransfers() {
  return (
    <>
      <Breadcrumb
        className="mb-5"
        items={[
          {
            href: "",
            title: <HomeOutlined />,
          },
          {
            href: "",
            title: (
              <>
                <span className="uppercase">Inventory Transfers</span>
              </>
            ),
          },
        ]}
      />
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
