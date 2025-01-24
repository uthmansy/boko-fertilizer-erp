import { Table } from "antd";
import useAllSales from "../../../hooks/useAllSales";
import { salesAdminColumns } from "../../../tableColumns/sales";
import Filters from "../../Filters";
import useFilters from "../../../hooks/useFilters";

function AllSales() {
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
  } = useFilters();
  const { isLoading, sales, fetchNextPage, isFetchingNextPage, isRefetching } =
    useAllSales({
      debouncedSearchTerm,
      dateFilter,
      itemFilter,
      warehouseFilter,
    });

  return (
    <>
      <Filters
        onSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        onDateChange={handleDateChange}
        itemFilter={itemFilter}
        itemOptions={itemOptions}
        onItemChange={handleItemChange}
        onReset={resetFilters}
        onWarehouseChange={handleWarehouseChange}
        warehouseFilter={warehouseFilter}
        warehouseOptions={warehouseOptions}
      />
      <Table
        size="small"
        loading={isLoading || isFetchingNextPage || isRefetching}
        columns={salesAdminColumns}
        dataSource={sales}
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

export default AllSales;
