import { ColumnsType } from "antd/es/table";
import { Purchases } from "../types/db"; // Use the appropriate type for sales payments
import { formatNumber } from "../helpers/functions";

export const payablesColumns: ColumnsType<Purchases> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text) => <span className="capitalize font-semibold">{text}</span>,
  },
  {
    title: "To be paid",
    dataIndex: "balance",
    key: "balance",
    render: (text) => <span className="">{`₦${formatNumber(text)}`}</span>,
  },
  {
    title: "Beneficiary",
    dataIndex: "seller",
    key: "seller",
    render: (text) => <span className="capitalize font-semibold">{text}</span>,
  },
  {
    title: "Order Number",
    dataIndex: "order_number",
    key: "order_number",
    render: (text) => <span className="capitalize font-semibold">{text}</span>,
  },
];
