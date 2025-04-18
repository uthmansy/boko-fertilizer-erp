import { ColumnsType } from "antd/es/table";
import { StocksJoined } from "../types/db"; // Ensure this matches the updated Sales type
import { formatNumber } from "../helpers/functions";

export const assetValuationColumns: ColumnsType<StocksJoined> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
  },
  {
    title: "Item",
    render: (_, record) => record.item,
  },
  {
    title: "Total Balance",
    render: (_, record) =>
      formatNumber(record.balance || 0 + record.production_balance),
  },
  {
    title: "Item Unit",
    render: (_, record) => record.item_info.unit,
  },
  {
    title: "Item Price",
    render: (_, record) =>
      record.item_info.purchase_cost
        ? `₦${formatNumber(record.item_info.purchase_cost)}`
        : "NA",
  },
  {
    title: "Total Value",
    render: (_, record) =>
      record.item_info.purchase_cost
        ? `₦${formatNumber(
            (record.balance || 0 + record.production_balance) *
              record.item_info.purchase_cost
          )}`
        : "NA",
  },
];
