// ViewPurchaseItems.tsx
import { Button, Modal, Table, Tag } from "antd";
import useViewPurchaseItems from "../../../hooks/useViewPurchaseItems";
import { puchaseItemsAdminColumns } from "../../../tableColumns/purchaseItems";

interface Props {
  purchaseId: string;
}

function ViewPurchaseItems({ purchaseId }: Props) {
  const {
    items,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    isRefetching,
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
  } = useViewPurchaseItems({ purchaseId });

  return (
    <>
      <Button onClick={handleOpenModal} type="primary">
        View Items
      </Button>
      <Modal
        footer={null}
        title="View Items"
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={960}
      >
        <Table
          size="small"
          loading={isLoading || isFetchingNextPage || isRefetching}
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
      </Modal>
    </>
  );
}

export default ViewPurchaseItems;
