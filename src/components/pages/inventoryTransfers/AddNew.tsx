import { Button, Modal } from "antd";
import useAddNewInventoryTransfer from "../../../hooks/useAddNewInventoryTransfer";
import FormBuilder from "../../utils/FormBuilder";

function AddNewInventoryTransfer() {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useAddNewInventoryTransfer();

  return (
    <>
      <Button onClick={handleOpenModal} type="primary">
        Add Transfer Order
      </Button>
      <Modal
        footer={null}
        title="Add Transfer Order"
        open={isModalOpen}
        onCancel={handleCloseModal}
      >
        <FormBuilder
          formConfig={formConfig}
          onSubmit={handleSubmit}
          loading={isLoading}
        />
      </Modal>
    </>
  );
}

export default AddNewInventoryTransfer;
