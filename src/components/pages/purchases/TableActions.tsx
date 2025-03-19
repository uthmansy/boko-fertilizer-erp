import { Space } from "antd";
import ViewPayments from "./ViewPayments";
import Record from "./Record";
import { PurchasesAndPayments } from "../../../types/db";
import EditPurchase from "./EditPurchase";
import useAuthStore from "../../../store/auth";
import ViewPurchaseItems from "./ViewPurchaseItems";

interface Props {
  purchase: PurchasesAndPayments;
}

function TableActions({ purchase }: Props) {
  const { userProfile } = useAuthStore();
  const showAdminActions = userProfile?.role === "SUPER ADMIN";
  return (
    <Space size="small">
      <ViewPayments purchase={purchase} />
      <ViewPurchaseItems purchaseId={purchase.id} />
      <Record purchase={purchase} />
      {showAdminActions && (
        <>
          <EditPurchase purchase={purchase} />
        </>
      )}
    </Space>
  );
}

export default TableActions;
