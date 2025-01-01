import { Button, Modal } from "antd";
import useStockIn from "../../../hooks/useStockIn";
import FormBuilder from "../../utils/FormBuilder";

function AddNew() {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useStockIn();

  return (
    <>
      <Button className="uppercase" onClick={handleOpenModal} type="default">
        + Add New
      </Button>
      <Modal
        footer={null}
        title="Add New Item"
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

export default AddNew;
