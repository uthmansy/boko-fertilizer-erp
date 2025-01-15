import { Table } from "antd";
import { userAdminColumns } from "../../../tableColumns/users"; // Updated columns import
import useAllUsers from "../../../hooks/useAllUsers"; // Updated hook import

function AllUsers() {
  const {
    isLoading,
    users, // Updated data reference
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllUsers();

  return (
    <Table
      size="small"
      loading={isLoading || isFetchingNextPage || isRefetching}
      columns={userAdminColumns} // Updated columns reference
      dataSource={users} // Updated data source
      pagination={false} // Disable pagination
      scroll={{ y: 550, x: "max-content" }}
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

export default AllUsers;
