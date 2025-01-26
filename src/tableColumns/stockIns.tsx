import { ColumnsType } from "antd/es/table";
import { StockInWithDetails } from "../types/db";
import { Tag } from "antd";
import { formatNumber } from "../helpers/functions";

export const stockInColumns: ColumnsType<StockInWithDetails> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text) => <span className="font-semibold capitalize">{text}</span>,
  },
  {
    title: "Warehouse",
    dataIndex: "warehouse",
    key: "warehouse",
    render: (text) => <span className="font-semibold capitalize">{text}</span>,
  },
  {
    title: "Item",
    dataIndex: "item",
    key: "item",
    render: (text) => (
      <Tag color="cyan" className="font-semibold capitalize">
        {text}
      </Tag>
    ),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    render: (_, record) => (
      <span className="font-semibold capitalize">
        {formatNumber(record.quantity)} {record.item_info.unit}
      </span>
    ),
  },
  {
    title: "Stocked By",
    dataIndex: "stocked_by",
    key: "stocked_by",
    render: (_, { stocked_by_info: { full_name } }) => (
      <span className="font-semibold uppercase">{full_name}</span>
    ),
  },
];
