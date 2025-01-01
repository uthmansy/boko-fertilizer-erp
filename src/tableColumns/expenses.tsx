import { ColumnsType } from "antd/es/table";
import { Expenses } from "../types/db";
import dayjs from "dayjs";
import { formatNumber } from "../helpers/functions";
import { Tag } from "antd";
import TableActions from "../components/pages/expenses/TableActions";

export const expensesAdminColumns: ColumnsType<Expenses> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
    fixed: "left",
    align: "center",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text) => <span className="capitalize">{text}</span>,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (text) => <span className="capitalize">{text}</span>,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (amount) => <span>{`₦${formatNumber(amount)}`}</span>, // Format amount as currency
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date) => <span>{dayjs(date).format("DD/MM/YYYY")}</span>, // Format date
  },
  {
    title: "Status",
    dataIndex: "approved",
    key: "approved",
    render: (_, record) => (
      <Tag color={`${record.approved ? "green" : "red"}`}>
        {record.approved ? "Approved" : "Pending Approval"}
      </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => <TableActions expense={record} />,
  },
];
