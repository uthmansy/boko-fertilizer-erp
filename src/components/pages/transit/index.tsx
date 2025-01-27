import { Button } from "antd";
import { vehiclesKeys } from "../../../constants/QUERY_KEYS";
import { getVehicles } from "../../../helpers/apiFunctions";
import useCsv from "../../../hooks/useCsv";
import { VehiclesAndDestination } from "../../../types/db";
import RefreshButton from "../../RefreshButton";
import AllTransit from "./AllTransit";
import { BorderInnerOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { flattenObject } from "../../../helpers/functions";
import { Headers } from "react-csv/lib/core";

function Transit() {
  const headers: Headers = [
    { label: "Waybill Number", key: "waybill_number" },
    { label: "Vehicle Number", key: "vehicle_number" },
    { label: "Item", key: "item" },
    { label: "Quantity Carried", key: "qty_carried" },
    { label: "Quantity Received", key: "qty_received" },
    { label: "Dispatched By", key: "dispatched_by" },
    { label: "Received By", key: "received_by" },
    { label: "Driver Name", key: "driver_name" },
    { label: "Driver Number", key: "driver_number" },
    { label: "Origin State", key: "origin_state" },
    { label: "Transporter", key: "transporter" },
    { label: "Date Dispatched", key: "date_dispatched" },
    { label: "Date Received", key: "date_received" },
    { label: "Item Code", key: "item_info_code" },
    { label: "Item Unit", key: "item_info_unit" },
    { label: "Purchase Cost", key: "item_info_purchase_cost" },
    { label: "Destination Warehouse", key: "destination_stock_warehouse" },
    {
      label: "Warehouse Address",
      key: "destination_stock_warehouse_info_address",
    },
    {
      label: "Stock Purchases Seller",
      key: "external_origin_stock_stock_purchases_seller",
    },
    {
      label: "Stock Purchases Quantity",
      key: "external_origin_stock_stock_purchases_quantity",
    },
  ];
  const { data } = useCsv<VehiclesAndDestination[]>({
    queryFn: () =>
      getVehicles(
        "dispatched",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        false
      ),
    queryKey: vehiclesKeys.getTransitCsv,
  });

  const flatData = data?.map((item) => flattenObject(item));

  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={vehiclesKeys.getTransitVehicles} />
        {flatData && (
          <Button icon={<BorderInnerOutlined />}>
            <CSVLink
              filename={"transit-trucks.csv"}
              data={flatData}
              headers={headers}
            >
              Export to CSV
            </CSVLink>
          </Button>
        )}
      </div>
      <AllTransit />
    </>
  );
}

export default Transit;
