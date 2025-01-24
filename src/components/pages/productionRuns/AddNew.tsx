import { Button, Form, Modal } from "antd";
import useAddNewProduction from "../../../hooks/useAddNewProduction";
import FormBuilder from "../../utils/FormBuilder";

function AddNew() {
  const [form] = Form.useForm();
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useAddNewProduction(form);

  return (
    <>
      <Button className="uppercase" onClick={handleOpenModal} type="default">
        + Add New
      </Button>
      <Modal
        footer={null}
        title="Enter Production Run"
        open={isModalOpen}
        onCancel={handleCloseModal}
      >
        <FormBuilder
          form={form}
          formConfig={formConfig}
          onSubmit={handleSubmit}
          loading={isLoading}
        />
      </Modal>
    </>
  );
}

export default AddNew;
