import { Space } from "antd";
import ViewPayroll from "./ViewPayroll";
import { PayrollsAndEmployees } from "../../../types/db";
import DeletePayroll from "./DeletePayroll";
import useAuthStore from "../../../store/auth";

interface Props {
  payroll: PayrollsAndEmployees;
}

function TableActions({ payroll }: Props) {
  const { userProfile } = useAuthStore();
  return (
    <Space size="small">
      <ViewPayroll payroll={payroll} />
      {payroll.status === "pending" &&
        (userProfile?.role === "ACCOUNTING" ||
          userProfile?.role === "SUPER ADMIN") && (
          <DeletePayroll payroll={payroll} />
        )}
    </Space>
  );
}

export default TableActions;
