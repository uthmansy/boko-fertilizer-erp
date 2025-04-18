import { Table } from "antd";
import useAllProductions from "../../../hooks/useAllProductions"; // Adjust the hook import
import { productionsAdminColumns } from "../../../tableColumns/productions"; // Adjust the columns import
import Filters from "../../Filters";
import useFilters from "../../../hooks/useFilters";

function AllProductions() {
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
    monthFilter,
    yearFilter,
    handleMonthChange,
    handleYearChange,
    monthOptions,
    yearOptions,
  } = useFilters();
  const {
    isLoading,
    productions,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllProductions({
    dateFilter,
    itemFilter,
    warehouseFilter,
    shiftFilter,
    monthFilter,
    yearFilter,
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
        monthFilter={monthFilter}
        monthOptions={monthOptions}
        onMonthChange={handleMonthChange}
        yearFilter={yearFilter}
        yearOptions={yearOptions}
        onYearChange={handleYearChange}
      />
      <Table
        size="small"
        loading={isLoading || isFetchingNextPage || isRefetching}
        columns={productionsAdminColumns} // Use the new columns
        dataSource={productions} // Use the new data source
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

export default AllProductions;
