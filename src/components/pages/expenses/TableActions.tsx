import { Space } from "antd";
import { Expenses } from "../../../types/db";
import DeleteExpense from "./DeleteExpense";
import ApproveExpense from "./ApproveExpense";
import useAuthStore from "../../../store/auth";

interface Props {
  expense: Expenses;
}

function TableActions({ expense }: Props) {
  const { userProfile } = useAuthStore();
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
    </Space>
  );
}

export default TableActions;
