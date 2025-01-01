import { Button, Modal, Table } from "antd";
import useViewItemCollection from "../../../hooks/useViewItemCollection";
import { InventoryItems } from "../../../types/db";
import { inventorySubItemsColumns } from "../../../tableColumns/inventorySubItems";

interface Props {
  item: InventoryItems;
}

function ViewCollection({ item }: Props) {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    items,
  } = useViewItemCollection({ parentItem: item.name });

  return (
    <>
      <Button onClick={handleOpenModal} type="default">
        View Collection
      </Button>
      <Modal
        footer={null}
        title={`Sub Items for ${item.name}`}
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={1000}
      >
        <Table
          size="small"
          loading={isLoading || isFetchingNextPage || isRefetching}
          columns={inventorySubItemsColumns}
          dataSource={items}
          pagination={false} // Disable pagination
          scroll={{ y: 600, x: 900 }}
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

export default ViewCollection;
