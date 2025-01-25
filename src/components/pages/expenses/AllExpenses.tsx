import { Table } from "antd";
import { expensesAdminColumns } from "../../../tableColumns/expenses"; // Updated columns import
import useAllExpenses from "../../../hooks/useAllExpenses"; // Updated hook import
import Filters from "../../Filters";
import useFilters from "../../../hooks/useFilters";

function AllExpenses() {
  const {
    debouncedSearchTerm,
    searchTerm,
    dateFilter,
    handleSearchChange,
    handleDateChange,
    resetFilters,
    handleWarehouseChange,
    warehouseFilter,
    warehouseOptions,
    expenseCategoryFilter,
    expenseCategoryOptions,
    handleExpenseCategoryChange,
  } = useFilters();
  const {
    isLoading,
    expenses,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllExpenses({
    debouncedSearchTerm,
    dateFilter,
    expenseCategoryFilter,
    warehouseFilter,
  });

  return (
    <>
      <Filters
        onSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        onDateChange={handleDateChange}
        onReset={resetFilters}
        onWarehouseChange={handleWarehouseChange}
        warehouseFilter={warehouseFilter}
        warehouseOptions={warehouseOptions}
        expenseCategoryFilter={expenseCategoryFilter}
        expenseCategoryOptions={expenseCategoryOptions}
        onExpenseCategoryChange={handleExpenseCategoryChange}
      />
      <Table
        size="small"
        loading={isLoading || isFetchingNextPage || isRefetching}
        columns={expensesAdminColumns} // Updated columns reference
        dataSource={expenses} // Updated data source
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

export default AllExpenses;
