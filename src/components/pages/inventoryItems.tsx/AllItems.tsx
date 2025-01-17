import { Button, Input, Select, Table } from "antd";
import useAllItems from "../../../hooks/useAllItems";
import { inventoryItemsAdminColumns } from "../../../tableColumns/inventoryItems";

function AllItems() {
  const {
    isLoading,
    items,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
    handleSearchByName,
    resetFilters,
    handleType,
  } = useAllItems();

  return (
    <>
      <div className="mb-5 flex space-x-3">
        <Button onClick={resetFilters}>Reset Filters</Button>
        <Input
          className="w-56"
          onPressEnter={handleSearchByName}
          placeholder="Search by Name and hit enter"
          allowClear
        />
        <Select
          placeholder="Filter by Item Type"
          className="w-56"
          options={[
            { label: "Raw", value: "raw" },
            { label: "Product", value: "product" },
          ]}
          onSelect={handleType}
        />
      </div>
      <Table
        size="small"
        loading={isLoading || isFetchingNextPage || isRefetching}
        columns={inventoryItemsAdminColumns}
        dataSource={items}
        pagination={false} // Disable pagination
        scroll={{ y: 450, x: "max-content" }}
        bordered
        onScroll={(e) => {
          const target = e.target as HTMLDivElement;
          if (
            Math.round(target.scrollHeight - target.scrollTop) ===
            target.clientHeight
          ) {
            console.log("reached");
            fetchNextPage();
          }
        }}
      />
    </>
  );
}

export default AllItems;
