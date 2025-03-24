import { Table } from "antd";
import useAllDeductions from "../../../hooks/useAllDeductions";
import { deductionColumns } from "../../../tableColumns/deductions";

interface Props {
  payrollId: string;
}

function AllDeductions({ payrollId }: Props) {
  const {
    isLoading,
    deductions,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllDeductions({
    payrollId,
  });

  return (
    <>
      <Table
        size="small"
        loading={isLoading || isFetchingNextPage || isRefetching}
        columns={deductionColumns}
        dataSource={deductions}
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

export default AllDeductions;
