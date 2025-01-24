import { Button, Form, Modal } from "antd";
import useAddNewFinishedProduct from "../../../hooks/useAddNewFinishedProduct";
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
  } = useAddNewFinishedProduct(form);

  return (
    <>
      <Button className="uppercase" onClick={handleOpenModal} type="default">
        + Add New
      </Button>
      <Modal
        footer={null}
        title="Enter Finished Product"
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
