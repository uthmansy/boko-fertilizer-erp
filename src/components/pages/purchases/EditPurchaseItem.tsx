import useEditPurchaseItem from "../../../hooks/useEditPurchaseItem";
import FormBuilder from "../../utils/FormBuilder";
import { PurchaseItemsJoined } from "../../../types/db";
import { MdModeEdit } from "react-icons/md";
import { Button, Modal } from "antd";

interface Props {
  item: PurchaseItemsJoined;
}

function EditPurchaseItem({ item }: Props) {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useEditPurchaseItem({ item });

  return (
    <>
      <Button onClick={handleOpenModal} type="default">
        <MdModeEdit />
      </Button>
      <Modal
        footer={null}
        title="Edit Purchase"
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={800}
      >
        <FormBuilder
          formConfig={formConfig}
          onSubmit={handleSubmit}
          loading={isLoading}
          columns={2}
        />
      </Modal>
    </>
  );
}

export default EditPurchaseItem;
