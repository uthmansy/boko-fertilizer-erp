import { Space } from "antd";
import Record from "./Record";
import { PurchasesAndPayments } from "../../../types/db";
import EditPurchase from "./EditPurchase";
import useAuthStore from "../../../store/auth";

interface Props {
  purchase: PurchasesAndPayments;
}

function TableActions({ purchase }: Props) {
  const { userProfile } = useAuthStore();
  const showAdminActions = userProfile?.role === "SUPER ADMIN";
  return (
    <Space size="small">
      {/* <ViewPayments purchase={purchase} /> */}
      {/* <ViewPurchaseItems purchaseId={purchase.id} /> */}
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
