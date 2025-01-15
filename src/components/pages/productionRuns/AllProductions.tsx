import { Table } from "antd";
import useAllProductions from "../../../hooks/useAllProductions"; // Adjust the hook import
import { productionsAdminColumns } from "../../../tableColumns/productions"; // Adjust the columns import

function AllProductions() {
  const {
    isLoading,
    productions,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllProductions(); // Use the new hook

  return (
    <Table
      size="small"
      loading={isLoading || isFetchingNextPage || isRefetching}
      columns={productionsAdminColumns} // Use the new columns
      dataSource={productions} // Use the new data source
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

export default AllProductions;
