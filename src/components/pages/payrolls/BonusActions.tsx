import { Space } from "antd";
import useAuthStore from "../../../store/auth";
import { PayrollBonus } from "../../../zodSchemas/payrollBonuses";
import DeleteBonus from "./DeleteBonus";

interface Props {
  record: PayrollBonus;
}

function BonusActions({ record }: Props) {
  const { userProfile } = useAuthStore();
  return (
    <Space size="small">
      {userProfile?.role === "ACCOUNTING" ||
        userProfile?.role === "SUPER ADMIN" ||
        userProfile?.role === "ADMIN"}
      <DeleteBonus id={record.id} />
    </Space>
  );
}

export default BonusActions;
