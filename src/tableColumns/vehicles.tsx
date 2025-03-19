import { ColumnsType } from "antd/es/table";
import { VehiclesAndDestination } from "../types/db";
import TransitTableActions from "../components/pages/transit/TransitTableActions";
import useAuthStore from "../store/auth";
import TableActions from "../components/pages/receivedVehicles/TableActions";
import DispatchedTableActions from "../components/pages/dispatchedVehicles/DispatchedTableActions";

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
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => <ReceivedTableActions vehicle={record} />,
    // },
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
      title: "Action",
      key: "action",
      render: (_, record) => <DispatchedTableActions vehicle={record} />,
    },
  ];
  return { dispatchedColumns, receivedColumns, transitColumns };
};
