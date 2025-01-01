import { Button, Modal } from "antd";
import FormBuilder from "../../utils/FormBuilder";
import useAddSalesPayment from "../../../hooks/useAddSalesPayment"; // Updated hook

interface Props {
  orderNumber: string;
}

function AddSalesPayment({ orderNumber }: Props) {
  // Updated component name
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useAddSalesPayment({ orderNumber }); // Updated hook usage

  return (
    <>
      <Button onClick={handleOpenModal} type="default">
        Add Payment
      </Button>
      <Modal
        footer={null}
        title="Add Payment"
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

export default AddSalesPayment; // Updated export name
