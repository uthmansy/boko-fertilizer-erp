import { Table } from "antd";
import useAllInventoryTransfers from "../../../hooks/useAllInventoryTransfers";
import { inventoryTransfersAdminColumns } from "../../../tableColumns/inventoryTransfers";

function AllInventoryTransfers() {
  const {
    isLoading,
    inventoryTransfers,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllInventoryTransfers();

  return (
    <Table
      size="small"
      loading={isLoading || isFetchingNextPage || isRefetching}
      columns={inventoryTransfersAdminColumns}
      dataSource={inventoryTransfers}
      pagination={false} // Disable pagination
      scroll={{ y: 450, x: "max-content" }}
      bordered
      onScroll={(e) => {
        const target = e.target as HTMLDivElement;
        if (
          Math.round(target.scrollHeight - target.scrollTop) ===
          target.clientHeight
        ) {
          fetchNextPage();
        }
      }}
    />
  );
}

export default AllInventoryTransfers;
