import { Space } from "antd";
import { InventoryItems } from "../../../types/db";
import EditItem from "./EditItem";
import ViewCollection from "./ViewCollection";

interface Props {
  item: InventoryItems;
}

function TableActions({ item }: Props) {
  return (
    <Space size="small">
      <EditItem item={item} />
      {item.as_collection && <ViewCollection item={item} />}
    </Space>
  );
}

export default TableActions;
