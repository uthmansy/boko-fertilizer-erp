import { ColumnsType } from "antd/es/table";
import { Departments } from "../types/db";

export const departmentsAdminColumns: ColumnsType<Departments> = [
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
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (record) => <span className="capitalize">{record}</span>,
  },
];
