import { ColumnsType } from "antd/es/table";
import { Employees } from "../types/db";
import { Tag } from "antd";
import TableActions from "../components/pages/employees/TableActions";
import { formatNumber } from "../helpers/functions";
// import EmployeesTableActions from "../components/pages/employees/EmployeesTableActions";

export const employeesAdminColumns: ColumnsType<Employees> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
  },
  {
    title: "Full Name",
    dataIndex: "first_name",
    key: "first_name",
    render: (_, record) => (
      <span className="capitalize">
        {record.first_name} {record.last_name}
      </span>
    ),
    width: 150,
  },
  {
    title: "Date Employed",
    dataIndex: "date_employed",
    key: "date_employed",
    render: (text) => <span className="capitalize">{text}</span>,
    width: 120,
  },
  {
    title: "Status",
    dataIndex: "employment_status",
    key: "employment_status",
    render: (_, record) => (
      <Tag
        color={`${
          record.employment_status === "active"
            ? "green"
            : record.employment_status === "not_active"
            ? "red"
            : "blue"
        }`}
      >
        {record.employment_status}
      </Tag>
    ),
    width: 100,
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
    render: (text) => <span className="capitalize">{text}</span>,
    width: 150,
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
    render: (text) => <span className="capitalize">{text}</span>,
    width: 150,
  },
  {
    title: "Type",
    dataIndex: "payroll_type",
    key: "payroll_type",
    render: (text) => <span className="capitalize">{text}</span>,
    width: 80,
  },
  {
    title: "Salary",
    dataIndex: "salary",
    key: "salary",
    render: (text) => (
      <span className="capitalize">
        {text ? `₦${formatNumber(text)}` : "N/A"}
      </span>
    ),
    width: 110,
  },
  {
    title: "Allowance",
    dataIndex: "allowance",
    key: "allowance",
    render: (text) => (
      <span className="capitalize">
        {text ? `₦${formatNumber(text)}` : "N/A"}
      </span>
    ),
    width: 110,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => <TableActions employee={record} />,
  },
];
