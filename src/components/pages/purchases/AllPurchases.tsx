import { Button, DatePicker, Input, Table } from "antd";
import useAllPurchases from "../../../hooks/useAllPurchases";
import { purchasesAdminColumns } from "../../../tableColumns/purchases";

function AllPurchases() {
  const {
    isLoading,
    purchases,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
    handleDateFilter,
    handleOrderNumberFilter,
    resetFilters,
  } = useAllPurchases();

  return (
    <>
      <div className="mb-5 flex space-x-3">
        <Button className="uppercase" onClick={resetFilters}>
          Reset All Filters
        </Button>
        <DatePicker
          className="w-56"
          onChange={(date) => handleDateFilter(date)}
        />
        <Input
          className="w-56"
          onPressEnter={handleOrderNumberFilter}
          placeholder="Order Number"
        />
      </div>
      <Table
        size="small"
        loading={isLoading || isFetchingNextPage || isRefetching}
        columns={purchasesAdminColumns}
        dataSource={purchases}
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
    </>
  );
}

export default AllPurchases;
