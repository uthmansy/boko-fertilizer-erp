import { Table } from "antd";
import useAllEmployees from "../../../hooks/useAllEmployees";
import { employeesAdminColumns } from "../../../tableColumns/employees";

function AllEmployees() {
  const {
    isLoading,
    employees,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllEmployees();

  return (
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
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
          fetchNextPage();
        }
      }}
    />
  );
}

export default AllEmployees;
