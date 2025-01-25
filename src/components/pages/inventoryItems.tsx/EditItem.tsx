import { Button, Modal } from "antd";
import useEditItem from "../../../hooks/useEditItem"; // Adjust import as necessary
import FormBuilder from "../../utils/FormBuilder";
import { InventoryItems } from "../../../types/db";

interface Props {
  item: InventoryItems;
}

function EditItem({ item }: Props) {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useEditItem({ item }); // Adjust hook name and logic as necessary

  return (
    <>
      <Button onClick={handleOpenModal} type="primary">
        Edit item
      </Button>
      <Modal
        footer={null}
        title="Edit item"
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

export default EditItem;
