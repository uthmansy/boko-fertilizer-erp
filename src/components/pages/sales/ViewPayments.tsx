import { Button, Modal, Space, Table, Tag } from "antd";
import useViewSalesPayments from "../../../hooks/useViewSalesPayments"; // Use the appropriate hook for sales payments
import { salesPaymentsAdminColumns } from "../../../tableColumns/salesPayments"; // Use the appropriate columns for sales payments
import { Sales } from "../../../types/db";
import { formatNumber } from "../../../helpers/functions";

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
        <Space>
          <Tag>Price: ₦{formatNumber(sale.price)}</Tag>
          <Tag>Paid: ₦{formatNumber(sale.paid)}</Tag>
          <Tag>Balance: ₦{formatNumber(sale.payment_balance)}</Tag>
        </Space>
        <Table
          size="small"
          loading={isLoading || isFetchingNextPage || isRefetching}
          columns={salesPaymentsAdminColumns} // Use sales payments columns
          dataSource={payments}
          pagination={false} // Disable pagination
          scroll={{ y: 550, x: "max-content" }}
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
      </Modal>
    </>
  );
}

export default ViewSalesPayments;
