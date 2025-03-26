import { Table } from "antd";
import useAllBonuses from "../../../hooks/useAllBonuses";
import { bonusColumns } from "../../../tableColumns/bonuses";

interface Props {
  payrollId: string;
}

function AllBonuses({ payrollId }: Props) {
  const {
    isLoading,
    bonuses,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllBonuses({
    payrollId,
  });

  return (
    <>
      <Table
        size="small"
        loading={isLoading || isFetchingNextPage || isRefetching}
        columns={bonusColumns}
        dataSource={bonuses}
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

export default AllBonuses;
