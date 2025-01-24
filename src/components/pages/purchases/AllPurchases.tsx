import { Table } from "antd";
import useAllPurchases from "../../../hooks/useAllPurchases";
import { purchasesAdminColumns } from "../../../tableColumns/purchases";
import useFilters from "../../../hooks/useFilters";
import Filters from "../../Filters";

function AllPurchases() {
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
  } = useFilters();
  const {
    isLoading,
    purchases,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllPurchases({
    debouncedSearchTerm,
    dateFilter,
    itemFilter,
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
      />
      <Table
        size="small"
        loading={isLoading || isFetchingNextPage || isRefetching}
        columns={purchasesAdminColumns}
        dataSource={purchases}
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

export default AllPurchases;
