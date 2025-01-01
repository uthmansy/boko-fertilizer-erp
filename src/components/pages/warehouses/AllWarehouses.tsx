import { Table } from "antd";
import { warehouseAdminColumns } from "../../../tableColumns/warehouses";
import useAllWarehouses from "../../../hooks/useAllWarehouses";

function AllWarehouses() {
  const {
    isLoading,
    warehouses,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllWarehouses();

  return (
    <Table
      size="small"
      loading={isLoading || isFetchingNextPage || isRefetching}
      columns={warehouseAdminColumns}
      dataSource={warehouses}
      pagination={false} // Disable pagination
      scroll={{ y: 450, x: "max-content" }}
      bordered
      onScroll={(e) => {
        const target = e.target as HTMLDivElement;
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
          fetchNextPage();
        }
      }}
    />
  );
}

export default AllWarehouses;
