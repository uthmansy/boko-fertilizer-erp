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
    handleShiftChange,
    shiftFilter,
    shiftOptions,
    itemFilter,
    itemOptions,
    handleItemChange,
  } = useFilters();
  const { isLoading, inflow, fetchNextPage, isFetchingNextPage, isRefetching } =
    useItemRequestInflow({
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
