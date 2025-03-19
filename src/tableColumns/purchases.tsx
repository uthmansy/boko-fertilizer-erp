import { ColumnsType } from "antd/es/table";
import { PurchasesAndPayments } from "../types/db";
import TableActions from "../components/pages/purchases/TableActions";
import { formatNumber } from "../helpers/functions";

export const purchasesAdminColumns: ColumnsType<PurchasesAndPayments> = [
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
  },
  {
    title: "Order Number",
    dataIndex: "order_number",
    key: "order_number",
    render: (text) => <span className="capitalize">{text}</span>,
  },
  {
    title: "Seller",
    dataIndex: "seller",
    key: "seller",
    render: (text) => <span className="capitalize">{text}</span>,
  },

  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (_, record) => (
      <span className="">{`₦${
        record.amount ? formatNumber(record.amount) : "NA"
      }`}</span>
    ),
  },
  {
    title: "Amount Paid",
    dataIndex: "paid",
    key: "paid",
    render: (_, record) => (
      <span className="">{`₦${formatNumber(record.paid)}`}</span>
    ),
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
    render: (_, record) => (
      <span className="">{`₦${
        record.balance ? formatNumber(record.balance) : "NA"
      }`}</span>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => <TableActions purchase={record} />,
  },
];
