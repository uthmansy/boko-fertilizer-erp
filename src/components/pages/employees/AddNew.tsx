import { Button, Modal } from "antd";
import useAddNewEmployee from "../../../hooks/useAddNewEmployee";
import FormBuilder from "../../utils/FormBuilder";

function AddNew() {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useAddNewEmployee();

  return (
    <>
      <Button className="uppercase" onClick={handleOpenModal} type="default">
        + Add New Employee
      </Button>
      <Modal
        footer={null}
        title="Add New Employee"
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

export default AddNew;
