import { Space } from "antd";
import { SalesPayments } from "../../../types/db";
import useAuthStore from "../../../store/auth";
import DeletePayment from "./DeletePayment";

interface Props {
  payment: SalesPayments;
}

function SalesPaymentActions({ payment }: Props) {
  const { userProfile } = useAuthStore();
  const showAdminActions = userProfile?.role === "SUPER ADMIN";
  return (
    <Space size="small">
      {showAdminActions && <DeletePayment payment={payment} />}
    </Space>
  );
}

export default SalesPaymentActions;
