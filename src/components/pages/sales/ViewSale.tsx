import {
  Badge,
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
import useViewSale from "../../../hooks/useViewSale";
import useViewSaleItems from "../../../hooks/useViewSaleItems";
import { salesItemsAdminColumns } from "../../../tableColumns/salesItems";
import { DescriptionsProps } from "antd/lib";
import { formatNumber } from "../../../helpers/functions";
import useAuthStore from "../../../store/auth";
import AddSalesPayment from "./AddPayment";
import useViewSalesPayments from "../../../hooks/useViewSalesPayments";
import { salesPaymentsAdminColumns } from "../../../tableColumns/salesPayments";

interface Props {
  orderNumber: string;
  buttonTitle: string;
}
function ViewSale({ orderNumber, buttonTitle }: Props) {
  const { userProfile } = useAuthStore();
  const showAdminActions = userProfile?.role === "SUPER ADMIN";
  const { handleCloseModal, handleOpenModal, isLoading, isModalOpen, sale } =
    useViewSale({ orderNumber });
  const {
    items,
    isLoading: isLoadingItems,
    isFetchingNextPage: isFetchingNextPageItems,
    fetchNextPage,
    isRefetching: isRefetchingItems,
  } = useViewSaleItems({ saleId: sale?.id, execQuery: isModalOpen });
  const {
    payments,
    isLoading: isLoadingPayments,
    isFetchingNextPage: isFetchingNextPayments,
    fetchNextPage: fetchNextPayments,
    isRefetching: isRefetchingPayments,
  } = useViewSalesPayments({ orderNumber });

  const descs: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Order Number",
      children: orderNumber,
    },
    {
      key: "2",
      label: "Date",
      children: sale?.date,
    },
    {
      key: "3",
      label: "Customer Name",
      children: sale?.customer_name || "NA",
    },
    {
      key: "4",
      label: "Customer Phone",
      children: sale?.customer_phone || "NA",
    },
    {
      key: "5",
      label: "Is Completed",
      children: sale?.order_number,
    },
    {
      key: "6",
      label: "Amount",
      children: sale?.amount != null ? `₦${formatNumber(sale?.amount)}` : "NA",
    },
    {
      key: "7",
      label: "Paid",
      children: sale?.paid != null ? `₦${formatNumber(sale?.paid)}` : "NA",
    },
    {
      key: "8",
      label: "Balance",
      children:
        sale?.payment_balance != null
          ? `₦${formatNumber(sale?.payment_balance)}`
          : "NA",
    },
  ];

  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: "Sale",
      children: isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <Spin />
        </div>
      ) : sale ? (
        <>
          <div>
            <Descriptions
              column={2}
              title="Sale Info"
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
              columns={salesItemsAdminColumns}
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
      ) : sale ? (
        <>
          <div>
            <Space className="mb-5">
              <Tag>
                Price: ₦{sale.amount ? formatNumber(sale.amount) : "NA"}
              </Tag>
              <Tag>Paid: ₦{formatNumber(sale.paid)}</Tag>
              <Tag>
                Balance: ₦
                {sale.payment_balance
                  ? formatNumber(sale.payment_balance)
                  : "NA"}
              </Tag>
            </Space>
            {(showAdminActions || userProfile?.role === "ACCOUNTING") && (
              <div className="mb-5">
                <AddSalesPayment orderNumber={orderNumber} />
              </div>
            )}
            <Table
              size="small"
              loading={
                isLoadingPayments ||
                isFetchingNextPayments ||
                isRefetchingPayments
              }
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
        title="View Sale"
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={960}
      >
        <Tabs size="small" defaultActiveKey="1" items={tabs} />
      </Modal>
    </>
  );
}

export default ViewSale;
