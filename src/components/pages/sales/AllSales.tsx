import { Table } from "antd";
import useAllSales from "../../../hooks/useAllSales";
import { salesAdminColumns } from "../../../tableColumns/sales";

function AllSales() {
  const { isLoading, sales, fetchNextPage, isFetchingNextPage, isRefetching } =
    useAllSales();

  return (
    <Table
      size="small"
      loading={isLoading || isFetchingNextPage || isRefetching}
      columns={salesAdminColumns}
      dataSource={sales}
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

export default AllSales;
