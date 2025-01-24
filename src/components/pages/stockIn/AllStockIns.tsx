import { Table } from "antd";
import useAllStockIns from "../../../hooks/useAllStockIns";
import { stockInColumns } from "../../../tableColumns/stockIns";
import Filters from "../../Filters";
import useFilters from "../../../hooks/useFilters";

function AllStockIns() {
  const {
    dateFilter,
    handleDateChange,
    resetFilters,
    handleWarehouseChange,
    warehouseFilter,
    warehouseOptions,
  } = useFilters();
  const {
    isLoading,
    stockIns,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllStockIns({
    dateFilter,
    warehouseFilter,
  });

  return (
    <>
      <Filters
        onDateChange={handleDateChange}
        onReset={resetFilters}
        onWarehouseChange={handleWarehouseChange}
        warehouseFilter={warehouseFilter}
        warehouseOptions={warehouseOptions}
      />
      <Table
        size="small"
        loading={isLoading || isFetchingNextPage || isRefetching}
        columns={stockInColumns}
        dataSource={stockIns}
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

export default AllStockIns;
