import { Button, Modal } from "antd";
import useEditEmployee from "../../../hooks/useEditEmployee"; // Adjust import as necessary
import FormBuilder from "../../utils/FormBuilder";
import { Employees } from "../../../types/db";

interface Props {
  employee: Employees;
}

function EditEmployee({ employee }: Props) {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useEditEmployee({ employee }); // Adjust hook name and logic as necessary

  return (
    <>
      <Button onClick={handleOpenModal} type="primary">
        Edit Employee
      </Button>
      <Modal
        footer={null}
        title="Edit Employee"
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

export default EditEmployee;
