import RefreshButton from "../../RefreshButton";
import { inventoryTransfersKeys } from "../../../constants/QUERY_KEYS";
import AddNew from "./AddNew";
import AllInventoryTransfers from "./AllInventoryTransfers";
import { Breadcrumb, Button } from "antd";
import { BorderInnerOutlined, HomeOutlined } from "@ant-design/icons";
import { Headers } from "react-csv/lib/core";
import useCsv from "../../../hooks/useCsv";
import { InventoryTransfer as InventoryTransferType } from "../../../types/db";
import { CSVLink } from "react-csv";
import { getInventoryTransfersData } from "../../../helpers/apiFunctions";

function InventoryTransfers() {
  const headers: Headers = [
    { label: "Balance", key: "balance" },
    { label: "Created At", key: "created_at" },
    { label: "Created By", key: "created_by" },
    { label: "Date", key: "date" },
    { label: "Destination Stock ID", key: "destination_stock_id" },
    { label: "ID", key: "id" },
    { label: "Item", key: "item" },
    { label: "Origin Stock ID", key: "origin_stock_id" },
    { label: "Quantity", key: "quantity" },
    { label: "Taken", key: "taken" },
  ];
  const { data } = useCsv<InventoryTransferType[]>({
    queryFn: getInventoryTransfersData,
    queryKey: inventoryTransfersKeys.getCsv,
  });
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
      <AllInventoryTransfers />
    </>
  );
}

export default InventoryTransfers;
