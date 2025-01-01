import { Table } from "antd";
import { expensesAdminColumns } from "../../../tableColumns/expenses"; // Updated columns import
import useAllExpenses from "../../../hooks/useAllExpenses"; // Updated hook import

function AllExpenses() {
  const {
    isLoading,
    expenses,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllExpenses();

  return (
    <>
      <Table
        size="small"
        loading={isLoading || isFetchingNextPage || isRefetching}
        columns={expensesAdminColumns} // Updated columns reference
        dataSource={expenses} // Updated data source
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
    </>
  );
}

export default AllExpenses;
