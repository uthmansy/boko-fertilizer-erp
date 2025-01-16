import { Table } from "antd";
import { usePayrollColumns } from "../../../tableColumns/payrolls"; // Updated columns import
import useAllPayrolls from "../../../hooks/useAllPayrolls"; // Updated hook import

function AllPayrolls() {
  const {
    isLoading,
    payrolls,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllPayrolls();

  const columns = usePayrollColumns();

  return (
    <Table
      size="small"
      loading={isLoading || isFetchingNextPage || isRefetching}
      columns={columns} // Updated columns reference
      dataSource={payrolls} // Updated data source
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

export default AllPayrolls;
