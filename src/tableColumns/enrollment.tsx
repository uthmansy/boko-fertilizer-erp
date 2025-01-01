import { ColumnsType } from "antd/es/table";
import { Enrollment } from "../types/db";

export const enrollmentAdminColumns: ColumnsType<Enrollment> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
    fixed: "left",
    align: "center",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (text) => <span>{text}</span>, // Assuming email should be displayed as is
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => <span>{text}</span>, // Assuming email should be displayed as is
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (text) => <span className="capitalize">{text}</span>,
  },
  {
    title: "Warehouse",
    dataIndex: "warehouse",
    key: "warehouse",
    render: (text) => <span className="capitalize">{text}</span>,
  },
];
