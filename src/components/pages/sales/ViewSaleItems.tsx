// ViewSaleItems.tsx
import { Button, Modal, Space, Table, Tag } from "antd";
import useViewSaleItems from "../../../hooks/useViewSaleItems";
import { salesItemsAdminColumns } from "../../../tableColumns/salesItems";

interface Props {
  saleId: string;
}

function ViewSaleItems({ saleId }: Props) {
  const {
    items,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    isRefetching,
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
  } = useViewSaleItems({ saleId });

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
      </Modal>
    </>
  );
}

export default ViewSaleItems;
