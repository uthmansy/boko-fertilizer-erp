import { Space } from "antd";
import { SalesItemsJoined } from "../../../types/db";
import useAuthStore from "../../../store/auth";
import DeleteItem from "./DeleteItem";
import EditSaleItem from "./EditSaleItem";

interface Props {
  item: SalesItemsJoined;
}

function SalesItemsActions({ item }: Props) {
  const { userProfile } = useAuthStore();
  const showAdminActions = userProfile?.role === "SUPER ADMIN";
  return (
    <Space size="small">
      {showAdminActions && <DeleteItem itemId={item.id} />}
      <EditSaleItem item={item} />
    </Space>
  );
}

export default SalesItemsActions;
