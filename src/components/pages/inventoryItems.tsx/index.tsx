import RefreshButton from "../../RefreshButton";
import { inventoryItemsKeys } from "../../../constants/QUERY_KEYS";
import AddNew from "./AddNew";
import AllItems from "./AllItems";
import useAuthStore from "../../../store/auth";
import { BorderInnerOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import { Headers } from "react-csv/lib/core";
import { InventoryItems as InventoryItemsType } from "../../../types/db";
import useCsv from "../../../hooks/useCsv";
import { CSVLink } from "react-csv";
import { getInventoryItemsData } from "../../../helpers/apiFunctions";

function InventoryItems() {
  const headers: Headers = [
    { label: "Code", key: "code" },
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
    { label: "Type", key: "type" },
    { label: "Unit", key: "unit" },
    { label: "Purchase Cost", key: "purchase_cost" },
    { label: "Unit Price", key: "unit_price" },
    { label: "Length", key: "length" },
    { label: "Width", key: "width" },
    { label: "Image Path", key: "image_path" },
    { label: "Image Public URL", key: "image_public_url" },
  ];
  const { data } = useCsv<InventoryItemsType[]>({
    queryFn: getInventoryItemsData,
    queryKey: inventoryItemsKeys.getCsv,
  });
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
          userProfile?.role === "MANAGER" ||
          userProfile?.role === "INVENTORY") && <AddNew />}
        {data && (
          <Button icon={<BorderInnerOutlined />}>
            <CSVLink
              filename={"Inventory-items.csv"}
              data={data}
              headers={headers}
            >
              Export to CSV
            </CSVLink>
          </Button>
        )}
      </div>
      <AllItems />
    </>
  );
}

export default InventoryItems;
