import { Table } from "antd";
import useAllSalesPayments from "../../../hooks/useAllSalesPayments";
import { salesPaymentsAdminColumns } from "../../../tableColumns/salesPayments";
import useAllPurchasePayments from "../../../hooks/useAllPurchasePayments";
import { purchasesPaymentsAdminColumns } from "../../../tableColumns/purchasePayments";

function Transactions() {
  const {
    isLoading,
    salesPayments,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllSalesPayments();
  const {
    isLoading: isLoadingP,
    purchasePayments,
    fetchNextPage: fetchNextPageP,
    isFetchingNextPage: isFetchingNextPageP,
    isRefetching: isRefetchingP,
  } = useAllPurchasePayments();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-20">
      <div>
        <h2 className="text-3xl mb-5">Inflow</h2>
        <Table
          size="small"
          loading={isLoading || isFetchingNextPage || isRefetching}
          columns={salesPaymentsAdminColumns} // Updated columns reference
          dataSource={salesPayments} // Updated data source
          pagination={false} // Disable pagination
          scroll={{ y: 450, x: "max-content" }}
          bordered
          onScroll={(e) => {
            const target = e.target as HTMLDivElement;
            if (
              target.scrollHeight - target.scrollTop ===
              target.clientHeight
            ) {
              fetchNextPage();
            }
          }}
        />
      </div>
      <div>
        <h2 className="text-3xl mb-5">Outflow</h2>
        <Table
          size="small"
          loading={isLoadingP || isFetchingNextPageP || isRefetchingP}
          columns={purchasesPaymentsAdminColumns} // Updated columns reference
          dataSource={purchasePayments} // Updated data source
          pagination={false} // Disable pagination
          scroll={{ y: 450, x: "max-content" }}
          bordered
          onScroll={(e) => {
            const target = e.target as HTMLDivElement;
            if (
              target.scrollHeight - target.scrollTop ===
              target.clientHeight
            ) {
              fetchNextPageP();
            }
          }}
        />
      </div>
    </div>
  );
}

export default Transactions;
