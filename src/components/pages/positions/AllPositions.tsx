import { Table } from "antd";
import { positionsAdminColumns } from "../../../tableColumns/positions"; // Updated columns import
import useAllPositions from "../../../hooks/useAllPositions"; // Updated hook import

function AllPositions() {
  const {
    isLoading,
    positions,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllPositions();

  return (
    <Table
      size="small"
      loading={isLoading || isFetchingNextPage || isRefetching}
      columns={positionsAdminColumns} // Updated columns reference
      dataSource={positions} // Updated data source
      pagination={false} // Disable pagination
      scroll={{ y: 550, x: "max-content" }}
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

export default AllPositions;
