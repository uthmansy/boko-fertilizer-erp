import { Table } from "antd";
import useAllPurchases from "../../../hooks/useAllPurchases";
import { purchasesAdminColumns } from "../../../tableColumns/purchases";

function AllPurchases() {
  const {
    isLoading,
    purchases,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllPurchases();

  return (
    <Table
      size="small"
      loading={isLoading || isFetchingNextPage || isRefetching}
      columns={purchasesAdminColumns}
      dataSource={purchases}
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

export default AllPurchases;
