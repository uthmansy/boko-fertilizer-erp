import { Table } from "antd";
import useAllProductSubmissions from "../../../hooks/useAllProductSubmissions";
import { productSubmissionsAdminColumns } from "../../../tableColumns/productSubmissions";

function AllProductSubmissions() {
  const {
    isLoading,
    productSubmissions,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllProductSubmissions();

  return (
    <Table
      size="small"
      loading={isLoading || isFetchingNextPage || isRefetching}
      columns={productSubmissionsAdminColumns}
      dataSource={productSubmissions}
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

export default AllProductSubmissions;
