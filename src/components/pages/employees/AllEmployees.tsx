import { Table } from "antd";
import useAllEmployees from "../../../hooks/useAllEmployees";
import { employeesAdminColumns } from "../../../tableColumns/employees";
import useFilters from "../../../hooks/useFilters";
import Filters from "../../Filters";

function AllEmployees() {
  const { debouncedSearchTerm, searchTerm, handleSearchChange } = useFilters();
  const {
    isLoading,
    employees,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllEmployees({
    debouncedSearchTerm,
  });

  return (
    <>
      <Filters onSearchChange={handleSearchChange} searchTerm={searchTerm} />
      <Table
        size="small"
        loading={isLoading || isFetchingNextPage || isRefetching}
        columns={employeesAdminColumns}
        dataSource={employees}
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

export default AllEmployees;
