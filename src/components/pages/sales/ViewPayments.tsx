import { Button, Modal, Space, Table, Tag } from "antd";
import useViewSalesPayments from "../../../hooks/useViewSalesPayments"; // Use the appropriate hook for sales payments
import { salesPaymentsAdminColumns } from "../../../tableColumns/salesPayments"; // Use the appropriate columns for sales payments
import { Sales } from "../../../types/db";
import { formatNumber } from "../../../helpers/functions";
import AddSalesPayment from "./AddPayment";
import useAuthStore from "../../../store/auth";

interface Props {
  orderNumber: string;
  sale: Sales;
}

function ViewSalesPayments({ orderNumber, sale }: Props) {
  const {
    payments,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    isRefetching,
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
  } = useViewSalesPayments({ orderNumber }); // Use the sales payments hook
  const { userProfile } = useAuthStore();
  const showAdminActions = userProfile?.role === "SUPER ADMIN";

  return (
    <>
      <Button onClick={handleOpenModal} type="primary">
        View Payment
      </Button>
      <Modal
        footer={null}
        title="View Payments"
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={720}
      >
        <Space className="mb-5">
          <Tag>Price: ₦{sale.amount ? formatNumber(sale.amount) : "NA"}</Tag>
          <Tag>Paid: ₦{formatNumber(sale.paid)}</Tag>
          <Tag>
            Balance: ₦
            {sale.payment_balance ? formatNumber(sale.payment_balance) : "NA"}
          </Tag>
        </Space>
        {(showAdminActions || userProfile?.role === "ACCOUNTING") && (
          <div className="mb-5">
            <AddSalesPayment orderNumber={orderNumber} />
          </div>
        )}
        <Table
          size="small"
          loading={isLoading || isFetchingNextPage || isRefetching}
          columns={salesPaymentsAdminColumns} // Use sales payments columns
          dataSource={payments}
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
      </Modal>
    </>
  );
}

export default ViewSalesPayments;
