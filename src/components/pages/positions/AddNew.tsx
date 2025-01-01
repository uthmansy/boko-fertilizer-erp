import { Button, Modal } from "antd";
import useAddNewPosition from "../../../hooks/useAddNewPosition"; // Updated hook for positions
import FormBuilder from "../../utils/FormBuilder";

function AddNew() {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useAddNewPosition(); // Updated hook for positions

  return (
    <>
      <Button className="uppercase" onClick={handleOpenModal} type="default">
        + Add New
      </Button>
      <Modal
        footer={null}
        title="Add New Position" // Updated title for positions
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
