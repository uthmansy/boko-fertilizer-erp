import { Table } from "antd";
import useItemRequestInflow from "../../../hooks/useItemRequestInflow";
import Filters from "../../Filters";
import useFilters from "../../../hooks/useFilters";
import { intemProductionInflowColumns } from "../../../tableColumns/itemProductionInflow";

function ItemRequestInflow() {
  const {
    dateFilter,
    handleDateChange,
    resetFilters,
    handleWarehouseChange,
    warehouseFilter,
    warehouseOptions,
    itemFilter,
    itemOptions,
    handleItemChange,
    monthFilter,
    yearFilter,
    handleMonthChange,
    handleYearChange,
    monthOptions,
    yearOptions,
  } = useFilters();
  const { isLoading, inflow, fetchNextPage, isFetchingNextPage, isRefetching } =
    useItemRequestInflow({
      dateFilter,
      warehouseFilter,
      itemFilter,
      monthFilter,
      yearFilter,
    });

  return (
    <>
      <Filters
        onDateChange={handleDateChange}
        onReset={resetFilters}
        onWarehouseChange={handleWarehouseChange}
        warehouseFilter={warehouseFilter}
        warehouseOptions={warehouseOptions}
        itemFilter={itemFilter}
        itemOptions={itemOptions}
        onItemChange={handleItemChange}
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
        columns={intemProductionInflowColumns}
        dataSource={inflow}
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

export default ItemRequestInflow;
