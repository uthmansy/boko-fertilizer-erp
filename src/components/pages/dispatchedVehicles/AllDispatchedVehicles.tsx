import { Table } from "antd";
import useDispatchedVehicles from "../../../hooks/useDispatchedVehicles"; // Use a hook for dispatched vehicles
import { useVehicleColumns } from "../../../tableColumns/vehicles"; // Columns for dispatched vehicles
import useFilters from "../../../hooks/useFilters";
import Filters from "../../Filters";

function AllDispatchedVehicles() {
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
  } = useDispatchedVehicles({
    debouncedSearchTerm,
    dateFilter,
    itemFilter,
    warehouseFilter,
    monthFilter,
    yearFilter,
  }); // Use the correct hook for dispatched vehicles

  const { dispatchedColumns } = useVehicleColumns();

  return (
    <>
      {/* <div className="max-w-max overflow-x-auto">
        <FormBuilder
          formConfig={filterFormConfig}
          onSubmit={handleSubmit}
          loading={isLoading}
          showSubmitButton={false}
          styles={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px", // Optional: to add spacing between the columns
          }}
        />
      </div> */}
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
        columns={dispatchedColumns} // Use the correct columns for dispatched vehicles
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

export default AllDispatchedVehicles;
