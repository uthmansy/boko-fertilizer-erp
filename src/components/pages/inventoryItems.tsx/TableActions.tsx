import { Space } from "antd";
import { InventoryItems } from "../../../types/db";
import EditItem from "./EditItem";
import ViewCollection from "./ViewCollection";
import DeleteItem from "./DeleteItem";

interface Props {
  item: InventoryItems;
}

function TableActions({ item }: Props) {
  return (
    <Space size="small">
      <EditItem item={item} />
      {item.as_collection && <ViewCollection item={item} />}
      <DeleteItem item={item} />
    </Space>
  );
}

export default TableActions;
