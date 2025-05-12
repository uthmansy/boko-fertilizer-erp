import { Breadcrumb, Button } from "antd";
import { vehiclesKeys } from "../../../constants/QUERY_KEYS";
import RefreshButton from "../../RefreshButton";
import AllReceivedVehicles from "./AllReceivedVehicles";
import { BorderInnerOutlined, HomeOutlined } from "@ant-design/icons";
import { VehiclesAndDestination } from "../../../types/db";
import { getVehicles } from "../../../helpers/apiFunctions";
import useCsv from "../../../hooks/useCsv";
import { Headers } from "react-csv/lib/core";
// import { flattenObject } from "../../../helpers/functions";
import { CSVLink } from "react-csv";

function ReceivedVehicles() {
  const { data } = useCsv<VehiclesAndDestination[]>({
    queryFn: () => getVehicles("received", {}),
    queryKey: vehiclesKeys.getReceivedCsv,
  });

  const flatVehicleItems = data?.flatMap((v) => v.items) || [];

  const vehicleItemsHeaders = Array.from(
    new Set(flatVehicleItems.map((item) => item.item))
  ).map((item) => ({ label: item, key: item }));

  const transformedData = data?.map((vehicle) => {
    // Create accumulator for quantities
    const itemTotals = vehicle.items.reduce((acc, item) => {
      //@ts-ignore
      acc[item.item] = (acc[item.item] || 0) + item.qty_received;
      return acc;
    }, {});

    // Return new object with merged properties
    return {
      ...vehicle,
      ...itemTotals,
    };
  });

  const headers: Headers = [
    { label: "Waybill Number", key: "waybill_number" },
    { label: "Vehicle Number", key: "vehicle_number" },
    { label: "Date Dispatched", key: "date_dispatched" },
    { label: "Date Received", key: "date_received" },
    { label: "Dispatched By", key: "dispatched_by" },
    { label: "Received By", key: "received_by" },
    { label: "Driver Name", key: "driver_name" },
    { label: "Driver Number", key: "driver_number" },
    { label: "Origin State", key: "origin_state" },
    { label: "Transporter", key: "transporter" },
    { label: "Destination Warehouse", key: "destination_info.name" },
    ...vehicleItemsHeaders,
  ];

  // const flatData = data?.map((item) => flattenObject(item));

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
                <span className="uppercase">Received Vehicles</span>
              </>
            ),
          },
        ]}
      />
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={vehiclesKeys.getReceivedVehicles} />
        {transformedData && (
          <Button icon={<BorderInnerOutlined />}>
            <CSVLink
              filename={"received-trucks.csv"}
              data={transformedData}
              headers={headers}
            >
              Export to CSV
            </CSVLink>
          </Button>
        )}
      </div>

      <AllReceivedVehicles />
    </>
  );
}

export default ReceivedVehicles;
