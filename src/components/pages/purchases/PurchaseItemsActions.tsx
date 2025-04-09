import { Space } from "antd";
import { PurchaseItemsJoined } from "../../../types/db";
import useAuthStore from "../../../store/auth";
import DeleteItem from "./DeleteItem";
import EditPurchaseItem from "./EditPurchaseItem";

interface Props {
  item: PurchaseItemsJoined;
}

function PurchaseItemsActions({ item }: Props) {
  const { userProfile } = useAuthStore();
  const showAdminActions = userProfile?.role === "SUPER ADMIN";
  return (
    <Space size="small">
      {showAdminActions && <DeleteItem itemId={item.id} />}
      <EditPurchaseItem item={item} />
    </Space>
  );
}

export default PurchaseItemsActions;
