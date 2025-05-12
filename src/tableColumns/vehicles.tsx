import { ColumnsType } from "antd/es/table";
import { VehiclesAndDestination } from "../types/db";
import TransitTableActions from "../components/pages/transit/TransitTableActions";
import useAuthStore from "../store/auth";
import TableActions from "../components/pages/receivedVehicles/TableActions";
import DispatchedTableActions from "../components/pages/dispatchedVehicles/DispatchedTableActions";
import ViewSale from "../components/pages/sales/ViewSale";

export const useVehicleColumns = (): {
  transitColumns: ColumnsType<VehiclesAndDestination>;
  receivedColumns: ColumnsType<VehiclesAndDestination>;
  dispatchedColumns: ColumnsType<VehiclesAndDestination>;
} => {
  const { userProfile } = useAuthStore();

  // Define common columns
  const commonColumns: ColumnsType<VehiclesAndDestination> = [
    {
      title: "S.N",
      render: (_, __, index) => index + 1, // Calculate row number
      width: 40,
      fixed: "left",
      align: "center",
    },
    {
      title: "Date Loaded",
      dataIndex: "date_dispatched",
      key: "date_dispatched",
      render: (text) => <span className="capitalize">{text}</span>,
    },
    {
      title: "Origin Warehouse",
      dataIndex: "origin_warehouse",
      key: "origin_warehouse",
      render: (text) => <span className="capitalize">{text || "NA"}</span>,
    },
    {
      title: "Vehicle Number",
      dataIndex: "vehicle_number",
      key: "vehicle_number",
      render: (text) => <span className="capitalize">{text}</span>,
    },
    {
      title: "Waybill Number",
      dataIndex: "waybill_number",
      key: "waybill_number",
      render: (text) => <span className="capitalize">{text}</span>,
    },
    {
      title: "Items Carried",
      key: "items_carried",
      render: (_, record) => (
        <div className="grid grid-cols-2">
          {record.items.map((item) => (
            <div className="flex space-x-3">
              <span>{item.item}:</span>
              <span>{item.qty_carried}</span>
            </div>
          ))}
        </div>
      ),
    },
    ...((userProfile?.role === "SUPER ADMIN" || userProfile?.role === "ADMIN"
      ? [
          {
            title: "Driver Phone",
            dataIndex: "driver_number",
            key: "driver_number",
            render: (text) => <span className="capitalize">{text}</span>,
          },
        ]
      : []) as ColumnsType<VehiclesAndDestination>),
  ];

  // Extend common columns for transit table
  const transitColumns: ColumnsType<VehiclesAndDestination> = [
    ...commonColumns,
    {
      title: "Destination",
      dataIndex: "destination_stock",
      key: "destination_stock",
      render: (_, record) => (
        <span className="capitalize">
          {record.destination_info?.name || ""}
        </span>
      ),
    },
    {
      title: "Driver Name",
      dataIndex: "driver_name",
      key: "driver_name",
      render: (_, record) => (
        <span className="capitalize">{record.driver_name || ""}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <TransitTableActions vehicle={record} />,
    },
  ];

  // Extend common columns for received vehicles table
  const receivedColumns: ColumnsType<VehiclesAndDestination> = [
    ...commonColumns,
    {
      title: "Date Received",
      key: "date_received",
      render: (_, record) => record.date_received,
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
      render: (_, record) => (
        <span className="capitalize">
          {record.destination_info?.name || ""}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <TableActions vehicle={record} />,
    },
  ];
  const dispatchedColumns: ColumnsType<VehiclesAndDestination> = [
    ...commonColumns,
    {
      title: "Sale Order Number",
      key: "sale_order_number",
      render: (_, record) =>
        record.sale_order_number && (
          <ViewSale
            buttonTitle={record.sale_order_number}
            orderNumber={record.sale_order_number}
          />
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <DispatchedTableActions vehicle={record} />,
    },
  ];
  return { dispatchedColumns, receivedColumns, transitColumns };
};
