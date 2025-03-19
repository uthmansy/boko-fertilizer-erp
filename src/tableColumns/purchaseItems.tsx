import { ColumnsType } from "antd/lib/table";
import { PurchaseItemsJoined } from "../types/db";
import { formatNumber } from "../helpers/functions";
import PurchaseItemsActions from "../components/pages/purchases/PurchaseItemsActions";

export const puchaseItemsAdminColumns: ColumnsType<PurchaseItemsJoined> = [
  {
    title: "Item",
    dataIndex: "item",
    key: "item",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    align: "right",
    render: (value) => formatNumber(value),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    align: "right",
    render: (value) => `₦${formatNumber(value)}`,
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    align: "right",
    render: (_, record) => `₦${formatNumber(record.quantity * record.price)}`,
  },
  {
    title: "Quantity Received",
    dataIndex: "quantity_received",
    key: "quantity_received",
    align: "right",
    render: (value) => formatNumber(value),
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
    align: "right",
    render: (value) => formatNumber(value),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => <PurchaseItemsActions item={record} />,
  },
];
