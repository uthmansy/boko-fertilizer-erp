import { ColumnsType } from "antd/es/table";
import { UserProfile } from "../types/db"; // Updated type import
import TableActions from "../components/pages/userManagement/TableActions";
import { Tag } from "antd";

export const userAdminColumns: ColumnsType<UserProfile> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
    fixed: "left",
    align: "center",
  },
  {
    title: "Full Name",
    dataIndex: "full_name",
    key: "full_name",
    render: (text) => <span>{text}</span>, // Display status as is
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (text) => <span className="capitalize">{text}</span>, // Capitalize role
  },
  {
    title: "Warehouse",
    dataIndex: "warehouse",
    key: "warehouse",
    render: (text) => <span className="capitalize">{text}</span>, // Capitalize warehouse
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    render: (text) => <span className="capitalize">{text}</span>,
  },
  {
    title: "Account Access",
    dataIndex: "restricted",
    key: "restricted",
    render: (_, record) => (
      <Tag color={`${record.restricted ? "red" : "green"}`}>
        {record.restricted ? "Restricted" : "Not Restricted"}
      </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => <TableActions user={record} />,
  },
];
