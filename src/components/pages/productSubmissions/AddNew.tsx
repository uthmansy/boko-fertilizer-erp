import { Button, Modal } from "antd";
import useAddNewSubmission from "../../../hooks/useAddNewSubmission";
import FormBuilder from "../../utils/FormBuilder";

function AddNew() {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useAddNewSubmission();

  return (
    <>
      <Button className="uppercase" onClick={handleOpenModal} type="default">
        + Add New Submission
      </Button>
      <Modal
        footer={null}
        title="Add New Submission"
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
