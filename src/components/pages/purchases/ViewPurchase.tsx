import {
  Button,
  Descriptions,
  Empty,
  Modal,
  Space,
  Spin,
  Table,
  Tabs,
  TabsProps,
  Tag,
} from "antd";
import useViewPurchase from "../../../hooks/useViewPurchase";
import useViewPurchaseItems from "../../../hooks/useViewPurchaseItems";
import { DescriptionsProps } from "antd/lib";
import { formatNumber } from "../../../helpers/functions";
import useAuthStore from "../../../store/auth";
import AddPurchasePayment from "./AddPayment";
import useViewPurchasePayments from "../../../hooks/useViewPurchasePayments";
import { puchaseItemsAdminColumns } from "../../../tableColumns/purchaseItems";
import { purchasesPaymentsAdminColumns } from "../../../tableColumns/purchasePayments";

interface Props {
  orderNumber: string;
  buttonTitle: string;
}
function ViewPurchase({ orderNumber, buttonTitle }: Props) {
  const { userProfile } = useAuthStore();
  const showAdminActions = userProfile?.role === "SUPER ADMIN";
  const {
    handleCloseModal,
    handleOpenModal,
    isLoading,
    isModalOpen,
    purchase,
  } = useViewPurchase({ orderNumber });
  const {
    items,
    isLoading: isLoadingItems,
    isFetchingNextPage: isFetchingNextPageItems,
    fetchNextPage,
    isRefetching: isRefetchingItems,
  } = useViewPurchaseItems({
    purchaseId: purchase?.id,
    execQuery: isModalOpen,
  });
  const {
    payments,
    isLoading: isLoadingPayments,
    isFetchingNextPage: isFetchingNextPayments,
    fetchNextPage: fetchNextPayments,
    isRefetching: isRefetchingPayments,
  } = useViewPurchasePayments({ orderNumber });

  const descs: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Order Number",
      children: orderNumber,
    },
    {
      key: "2",
      label: "Date",
      children: purchase?.date,
    },
    {
      key: "3",
      label: "Supplier Name",
      children: purchase?.seller || "NA",
    },
    {
      key: "4",
      label: "Amount",
      children: purchase?.amount ? `₦${formatNumber(purchase?.amount)}` : "NA",
    },
    {
      key: "5",
      label: "Paid",
      children: purchase?.paid ? `₦${formatNumber(purchase?.paid)}` : "NA",
    },
    {
      key: "6",
      label: "Balance",
      children: purchase?.balance
        ? `₦${formatNumber(purchase?.balance)}`
        : "NA",
    },
  ];

  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: "Purchase",
      children: isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <Spin />
        </div>
      ) : purchase ? (
        <>
          <div>
            <Descriptions
              column={2}
              title="Purchase Info"
              bordered
              items={descs}
              className="mb-5"
            />
            <h2 className="text-xl mb-5 uppercase">Items</h2>
            <Table
              size="small"
              loading={
                isLoadingItems || isFetchingNextPageItems || isRefetchingItems
              }
              columns={puchaseItemsAdminColumns}
              dataSource={items}
              pagination={false}
              scroll={{ y: 450, x: "max-content" }}
              bordered
              rowKey="id"
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
          </div>
        </>
      ) : (
        <Empty />
      ),
    },
    {
      key: "2",
      label: "Payments",
      children: isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <Spin />
        </div>
      ) : purchase ? (
        <>
          <div>
            <Space className="mb-5">
              <Tag>
                Total: ₦{purchase.amount ? formatNumber(purchase.amount) : "NA"}
              </Tag>
              <Tag>Paid: ₦{formatNumber(purchase.paid)}</Tag>
              <Tag>
                Balance: ₦
                {purchase.balance ? formatNumber(purchase.balance) : "NA"}
              </Tag>
            </Space>
            {(showAdminActions || userProfile?.role === "ACCOUNTING") && (
              <div className="mb-5">
                <AddPurchasePayment orderNumber={orderNumber} />
              </div>
            )}
            <Table
              size="small"
              loading={
                isLoadingPayments ||
                isFetchingNextPayments ||
                isRefetchingPayments
              }
              columns={purchasesPaymentsAdminColumns}
              dataSource={payments}
              pagination={false}
              scroll={{ y: 450, x: "max-content" }}
              bordered
              onScroll={(e) => {
                const target = e.target as HTMLDivElement;
                if (
                  Math.round(target.scrollHeight - target.scrollTop) ===
                  target.clientHeight
                ) {
                  fetchNextPayments();
                }
              }}
            />
          </div>
        </>
      ) : (
        <Empty />
      ),
    },
  ];

  return (
    <>
      <Button onClick={handleOpenModal}>{buttonTitle}</Button>
      <Modal
        footer={null}
        title="View Purchase"
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={960}
      >
        <Tabs size="small" defaultActiveKey="1" items={tabs} />
      </Modal>
    </>
  );
}

export default ViewPurchase;
