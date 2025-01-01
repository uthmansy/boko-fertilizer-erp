import { ColumnProps } from "antd/es/table";
import { EmployeePayrollAndEmployee } from "../types/db";
import { formatNumber } from "../helpers/functions";
import EmployeePayrollTableActions from "../components/pages/payrolls/EmployeePayrollTableActions";

export const employeePayrollAdminColumns: ColumnProps<EmployeePayrollAndEmployee>[] =
  [
    {
      title: "S.N",
      render: (_, __, index) => index + 1, // Calculate row number
      width: 40,
      fixed: "left",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
      render: (_, record) => (
        <span className="capitalize">
          {record.employee.first_name} {record.employee.last_name}
        </span>
      ),
    },
    {
      title: "Type",
      dataIndex: "payroll_type",
      key: "payroll_type",
      render: (_, record) => (
        <span className="capitalize">{record.payroll_type}</span>
      ),
    },
    {
      title: "Amount to be Paid",
      dataIndex: "to_be_paid",
      key: "to_be_paid",
      render: (_, record) => `₦${formatNumber(record.to_be_paid)}`,
    },
    {
      title: "Bank Name",
      dataIndex: "employee",
      key: "employee_bank_name",
      render: (_, record) => record.employee.bank_name,
    },
    {
      title: "Account Number",
      dataIndex: "employee",
      key: "employee_account_number",
      render: (_, record) => record.employee.bank_account_number,
    },
    {
      title: "note",
      dataIndex: "note",
      key: "to_be_paid",
      render: (_, record) => record.note,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <EmployeePayrollTableActions employeePayroll={record} />
      ),
    },
  ];
