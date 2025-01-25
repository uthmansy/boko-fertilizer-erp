import { Space } from "antd";
import { Expenses } from "../../../types/db";
import DeleteExpense from "./DeleteExpense";
import ApproveExpense from "./ApproveExpense";
import useAuthStore from "../../../store/auth";
import EditExpense from "./EditExpense";

interface Props {
  expense: Expenses;
}

function TableActions({ expense }: Props) {
  const { userProfile } = useAuthStore();
  const showAdminActions = userProfile?.role === "SUPER ADMIN";
  return (
    <Space size="small">
      {!expense.approved && (
        <>
          <DeleteExpense expense={expense} />

          {(userProfile?.role === "ADMIN" ||
            userProfile?.role === "SUPER ADMIN") && (
            <ApproveExpense expense={expense} />
          )}
        </>
      )}
      {showAdminActions && (
        <>
          <EditExpense expense={expense} />
        </>
      )}
    </Space>
  );
}

export default TableActions;
