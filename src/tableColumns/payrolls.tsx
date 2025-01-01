import { ColumnsType } from "antd/es/table";
import { PayrollsAndEmployees } from "../types/db";
import { formatNumber, getMonthName } from "../helpers/functions";
import { Tag } from "antd";
import TableActions from "../components/pages/payrolls/TableActions";
import useAuthStore from "../store/auth";

export const usePayrollColumns = (): ColumnsType<PayrollsAndEmployees> => {
  const { userProfile } = useAuthStore();

  const columns: ColumnsType<PayrollsAndEmployees> = [
    {
      title: "S.N",
      render: (_, __, index) => index + 1, // Calculate row number
      width: 40,
      fixed: "left",
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      render: (text) => <span>{getMonthName(text)}</span>, // Display month
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      render: (text) => <span>{text}</span>, // Display year
    },
    {
      title: "Total Paid",
      dataIndex: "total_paid",
      key: "total_paid",
      render: (text) => <span>₦{formatNumber(text)}</span>, // Display total paid
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <Tag
          color={`${
            record.status === "pending"
              ? "blue"
              : record.status === "paid"
              ? "green"
              : "red"
          }`}
        >
          {record.status}
        </Tag>
      ),
    },
    // Conditionally add the "Action" column if the user role is "MANAGER"
    ...((userProfile?.role === "ACCOUNTING" ||
    userProfile?.role === "SUPER ADMIN" ||
    userProfile?.role === "ADMIN"
      ? [
          {
            title: "Action",
            key: "action",
            render: (_, record) => <TableActions payroll={record} />,
          },
        ]
      : []) as ColumnsType<PayrollsAndEmployees>),
  ];
  return columns;
};
