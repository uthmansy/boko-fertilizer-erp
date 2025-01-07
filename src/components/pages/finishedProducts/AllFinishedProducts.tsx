import { Table } from "antd";
import useAllFinishedProducts from "../../../hooks/useAllFinishedProducts"; // Adjust the hook import
import { finishedProductsColumns } from "../../../tableColumns/finishedProducts";

function AllFinishedProducts() {
  const {
    isLoading,
    finishedProducts,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllFinishedProducts(); // Use the new hook

  return (
    <Table
      size="small"
      loading={isLoading || isFetchingNextPage || isRefetching}
      columns={finishedProductsColumns} // Use the new columns
      dataSource={finishedProducts} // Use the new data source
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

export default AllFinishedProducts;
