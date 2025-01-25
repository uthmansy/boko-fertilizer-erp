import { Space } from "antd";
import { PurchasePayments } from "../../../types/db";
import useAuthStore from "../../../store/auth";
import DeletePurchasePayment from "./DeletePurchasePayment";

interface Props {
  payment: PurchasePayments;
}

function PurchcasePaymentActions({ payment }: Props) {
  const { userProfile } = useAuthStore();
  const showAdminActions = userProfile?.role === "SUPER ADMIN";
  return (
    <Space size="small">
      {showAdminActions && <DeletePurchasePayment purchasePayment={payment} />}
    </Space>
  );
}

export default PurchcasePaymentActions;
