import { Table } from "antd";
import useAllRequests from "../../../hooks/useAllRequests";
import { requestsAdminColumns } from "../../../tableColumns/requests";

function AllRequests() {
  const {
    isLoading,
    requests,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllRequests();

  return (
    <Table
      size="small"
      loading={isLoading || isFetchingNextPage || isRefetching}
      columns={requestsAdminColumns}
      dataSource={requests}
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
  );
}

export default AllRequests;
