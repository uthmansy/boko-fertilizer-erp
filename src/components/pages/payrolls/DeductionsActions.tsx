import { Space } from "antd";
import useAuthStore from "../../../store/auth";
import DeleteDeduction from "./DeleteDeduction";
import { Deduction } from "../../../zodSchemas/payrollDeductions";

interface Props {
  record: Deduction;
}

function DeductionActions({ record }: Props) {
  const { userProfile } = useAuthStore();
  return (
    <Space size="small">
      {userProfile?.role === "ACCOUNTING" ||
        userProfile?.role === "SUPER ADMIN" ||
        userProfile?.role === "ADMIN"}
      <DeleteDeduction id={record.id} />
    </Space>
  );
}

export default DeductionActions;
