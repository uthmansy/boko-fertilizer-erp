import { ColumnsType } from "antd/es/table";
import { FinishedProductsTableSummary } from "../types/db"; // Ensure this matches the updated Sales type
import { formatNumber } from "../helpers/functions";

export const dailyProductionColumns: ColumnsType<FinishedProductsTableSummary> =
  [
    {
      title: "S.N",
      render: (_, __, index) => index + 1, // Calculate row number
      width: "10px",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (_, record) => <span>{record.product_info.name}</span>,
      width: 100,
    },
    {
      title: "Quantity (metre)",
      dataIndex: "total_quantity_produced",
      key: "total_quantity_produced",
      render: (_, record) => (
        <span>
          {record.pieces ? formatNumber(record.pieces) : "NA"} {"metre"}
        </span>
      ),
      width: 100,
    },
    {
      title: "Quantity (pieces)",
      dataIndex: "pieces",
      key: "pieces",
      render: (_, record) => (
        <span>
          {record.pieces ? formatNumber(record.pieces) : "NA"} {"pieces"}
        </span>
      ),
      width: 100,
    },
    {
      title: "Quantity (bale)",
      dataIndex: "bale",
      key: "bale",
      render: (_, record) => (
        <span>
          {record.bales ? formatNumber(record.bales) : "NA"} {"bale"}
        </span>
      ),
      width: 100,
    },

    //   {
    //     title: "Action",
    //     key: "action",
    //     render: (_, record) => (
    //       <TableActions sale={record} orderNumber={record.order_number} />
    //     ),
    //   },
  ];
