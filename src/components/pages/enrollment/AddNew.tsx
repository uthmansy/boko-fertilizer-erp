import { Button, Modal } from "antd";
import useAddNewEnrollment from "../../../hooks/useAddNewEnrollment"; // Updated hook
import FormBuilder from "../../utils/FormBuilder";

function AddNew() {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useAddNewEnrollment(); // Updated hook

  return (
    <>
      <Button className="uppercase" onClick={handleOpenModal} type="default">
        + Add New
      </Button>
      <Modal
        footer={null}
        title="Add New Enrollment" // Updated title
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
