// salesItemsAdminColumns.ts
import { ColumnsType } from "antd/lib/table";
import { SalesItemsJoined } from "../types/db";
import { formatNumber } from "../helpers/functions";
import SalesItemsActions from "../components/pages/sales/SalesItemsActions";

export const salesItemsAdminColumns: ColumnsType<SalesItemsJoined> = [
  {
    title: "Item",
    dataIndex: "item_purchased",
    key: "item_purchased",
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
    title: "VAT",
    dataIndex: "vat",
    key: "vat",
    align: "right",
    render: (value) => `${formatNumber(value)}%`,
  },
  {
    title: "Taken",
    dataIndex: "quantity_taken",
    key: "quantity_taken",
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
  //   {
  //     title: "External Stock",
  //     dataIndex: "external_stock",
  //     key: "external_stock",
  //     render: (value) => value || "N/A",
  //   },
  {
    title: "Action",
    key: "action",
    render: (_, record) => <SalesItemsActions item={record} />,
  },
];
