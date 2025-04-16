import { Table } from "antd";
import useTransit from "../../../hooks/useTransit";
import { useVehicleColumns } from "../../../tableColumns/vehicles";
import useFilters from "../../../hooks/useFilters";
import Filters from "../../Filters";

function AllTransit() {
  const {
    debouncedSearchTerm,
    searchTerm,
    dateFilter,
    handleSearchChange,
    handleDateChange,
    itemOptions,
    handleItemChange,
    resetFilters,
    itemFilter,
    handleWarehouseChange,
    warehouseFilter,
    warehouseOptions,
    monthFilter,
    yearFilter,
    handleMonthChange,
    handleYearChange,
    monthOptions,
    yearOptions,
  } = useFilters();

  const {
    isLoading,
    vehicles,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useTransit({
    debouncedSearchTerm,
    dateFilter,
    itemFilter,
    warehouseFilter,
    monthFilter,
    yearFilter,
  });

  const { transitColumns } = useVehicleColumns();

  return (
    <>
      <Filters
        onSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        searchPlaceholder="search truck number"
        onDateChange={handleDateChange}
        itemFilter={itemFilter}
        itemOptions={itemOptions}
        onItemChange={handleItemChange}
        onReset={resetFilters}
        onWarehouseChange={handleWarehouseChange}
        warehouseFilter={warehouseFilter}
        warehouseOptions={warehouseOptions}
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
        columns={transitColumns}
        dataSource={vehicles}
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

export default AllTransit;
