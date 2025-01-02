import RefreshButton from "../../RefreshButton";
import { inventoryItemsKeys } from "../../../constants/QUERY_KEYS";
import AddNew from "./AddNew";
import AllItems from "./AllItems";
import useAuthStore from "../../../store/auth";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

function InventoryItems() {
  const { userProfile } = useAuthStore();
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
                <span className="uppercase">Inventory Items</span>
              </>
            ),
          },
        ]}
      />
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
