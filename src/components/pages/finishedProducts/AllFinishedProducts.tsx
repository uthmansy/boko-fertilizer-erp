import { Table } from "antd";
import useAllFinishedProducts from "../../../hooks/useAllFinishedProducts"; // Adjust the hook import
import { finishedProductsColumns } from "../../../tableColumns/finishedProducts";
import useFilters from "../../../hooks/useFilters";
import Filters from "../../Filters";

function AllFinishedProducts() {
  const {
    dateFilter,
    handleDateChange,
    itemOptions,
    handleItemChange,
    resetFilters,
    itemFilter,
    handleWarehouseChange,
    warehouseFilter,
    warehouseOptions,
    handleShiftChange,
    shiftFilter,
    shiftOptions,
  } = useFilters();
  const {
    isLoading,
    finishedProducts,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllFinishedProducts({
    dateFilter,
    itemFilter,
    warehouseFilter,
    shiftFilter,
  }); // Use the new hook

  return (
    <>
      <Filters
        onDateChange={handleDateChange}
        itemFilter={itemFilter}
        itemOptions={itemOptions}
        onItemChange={handleItemChange}
        onReset={resetFilters}
        onWarehouseChange={handleWarehouseChange}
        warehouseFilter={warehouseFilter}
        warehouseOptions={warehouseOptions}
        onShiftChange={handleShiftChange}
        shiftOptions={shiftOptions}
        shiftFilter={shiftFilter}
      />
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
          if (
            Math.round(target.scrollHeight - target.scrollTop) ===
            target.clientHeight
          ) {
            fetchNextPage();
            console.log("reached");
          }
        }}
      />
    </>
  );
}

export default AllFinishedProducts;
