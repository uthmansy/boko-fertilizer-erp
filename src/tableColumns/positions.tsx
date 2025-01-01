import { ColumnsType } from "antd/es/table";
import { Positions } from "../types/db"; // Ensure this import reflects your actual type definition

export const positionsAdminColumns: ColumnsType<Positions> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
    fixed: "left",
    align: "center",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <span className="capitalize">{text}</span>,
  },
  {
    title: "Department",
    dataIndex: "department", // Assuming there's a department field
    key: "department",
    render: (text) => <span className="capitalize">{text}</span>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text) => <span className="capitalize">{text}</span>,
  },
];
