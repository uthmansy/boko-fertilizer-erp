import { Table } from "antd";
import useAllProductSubmissions from "../../../hooks/useAllProductSubmissions";
import { productSubmissionsAdminColumns } from "../../../tableColumns/productSubmissions";
import Filters from "../../Filters";
import useFilters from "../../../hooks/useFilters";

function AllProductSubmissions() {
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
    productSubmissions,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllProductSubmissions({
    dateFilter,
    itemFilter,
    warehouseFilter,
    shiftFilter,
  });

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
        columns={productSubmissionsAdminColumns}
        dataSource={productSubmissions}
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

export default AllProductSubmissions;
