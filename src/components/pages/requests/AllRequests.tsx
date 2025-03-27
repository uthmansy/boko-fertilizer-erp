import { Table } from "antd";
import useAllRequests from "../../../hooks/useAllRequests";
import { requestsAdminColumns } from "../../../tableColumns/requests";
import Filters from "../../Filters";
import useFilters from "../../../hooks/useFilters";

function AllRequests() {
  const {
    dateFilter,
    handleDateChange,
    resetFilters,
    handleWarehouseChange,
    warehouseFilter,
    warehouseOptions,
    handleShiftChange,
    shiftFilter,
    shiftOptions,
    itemFilter,
    itemOptions,
    handleItemChange,
  } = useFilters();
  const {
    isLoading,
    requests,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllRequests({
    dateFilter,
    warehouseFilter,
    shiftFilter,
    itemFilter,
  });

  return (
    <>
      <Filters
        onDateChange={handleDateChange}
        onReset={resetFilters}
        onWarehouseChange={handleWarehouseChange}
        warehouseFilter={warehouseFilter}
        warehouseOptions={warehouseOptions}
        onShiftChange={handleShiftChange}
        shiftOptions={shiftOptions}
        shiftFilter={shiftFilter}
        itemFilter={itemFilter}
        itemOptions={itemOptions}
        onItemChange={handleItemChange}
      />
      <Table
        size="small"
        loading={isLoading || isFetchingNextPage || isRefetching}
        columns={requestsAdminColumns}
        dataSource={requests}
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
    </>
  );
}

export default AllRequests;
