import { ColumnsType } from "antd/es/table";
import { InventoryTransferWithStocks } from "../types/db";
import { formatNumber } from "../helpers/functions";
// import InventoryTransfersTableActions from "../components/pages/inventoryTransfers/InventoryTransfersTableActions";

export const inventoryTransfersAdminColumns: ColumnsType<InventoryTransferWithStocks> =
  [
    {
      title: "S.N",
      render: (_, __, index) => index + 1, // Calculate row number
      width: 40,
      fixed: "left",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span className="capitalize">{text}</span>,
      width: 120,
    },
    {
      title: "Created By",
      dataIndex: "created_by",
      key: "item",
      render: (_, record) => record.createdBy.full_name,
      width: 150,
    },
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
      render: (text) => <span className="capitalize">{text}</span>,
      width: 150,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <span>{formatNumber(text)} bags</span>,
      width: 120,
    },
    {
      title: "Taken",
      dataIndex: "taken",
      key: "taken",
      render: (text) => <span>{formatNumber(text)} bags</span>,
      width: 120,
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (text) => <span>{formatNumber(text)} bags</span>,
      width: 120,
    },
    {
      title: "Origin",
      dataIndex: "origin_stock_id",
      key: "origin_stock_id",
      render: (_, record) => record.originStock.warehouse,
      width: 150,
    },
    {
      title: "Destination",
      dataIndex: "destination_stock_id",
      key: "destination_stock_id",
      render: (_, record) => record.destinationStock.warehouse,
      width: 150,
    },
    //   {
    //     title: "Action",
    //     key: "action",
    //     render: (_, record) => (
    //       <InventoryTransfersTableActions inventoryTransfer={record} />
    //     ),
    //   },
  ];
