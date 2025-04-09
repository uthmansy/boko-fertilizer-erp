import { Button, Modal, Table } from "antd";
import useViewPurchasePayments from "../../../hooks/useViewPurchasePayments";
import { purchasesPaymentsAdminColumns } from "../../../tableColumns/purchasePayments";
import AddPayment from "./AddPayment";
import { PurchasesAndPayments } from "../../../types/db";

interface Props {
  purchase: PurchasesAndPayments;
}

function ViewPayments({ purchase }: Props) {
  const {
    payments,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    isRefetching,
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
  } = useViewPurchasePayments({ orderNumber: purchase.order_number });

  return (
    <>
      <Button onClick={handleOpenModal} type="primary">
        View Payment
      </Button>
      <Modal
        footer={null}
        title="Add Payment"
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={720}
      >
        <div className="mb-5">
          <AddPayment orderNumber={purchase.order_number} />
        </div>
        <Table
          size="small"
          loading={isLoading || isFetchingNextPage || isRefetching}
          columns={purchasesPaymentsAdminColumns}
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

export default ViewPayments;
