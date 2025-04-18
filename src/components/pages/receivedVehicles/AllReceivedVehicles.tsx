import { Table } from "antd";
import useReceivedVehicles from "../../../hooks/useReceivedVehicles"; // Use a hook for received vehicles
import { useVehicleColumns } from "../../../tableColumns/vehicles"; // Columns for received vehicles
import Filters from "../../Filters";
import useFilters from "../../../hooks/useFilters";

function AllReceivedVehicles() {
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
  } = useReceivedVehicles({
    debouncedSearchTerm,
    dateFilter,
    itemFilter,
    warehouseFilter,
    monthFilter,
    yearFilter,
  }); // Use the correct hook for received vehicles

  const { receivedColumns } = useVehicleColumns();

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
        columns={receivedColumns} // Use the correct columns for received vehicles
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

export default AllReceivedVehicles;
