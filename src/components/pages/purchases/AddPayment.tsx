import { Button, Modal } from "antd";
import FormBuilder from "../../utils/FormBuilder";
import useAddPurchasePayment from "../../../hooks/useAddPurchasePayment";

interface Props {
  orderNumber: string;
}

function AddPayment({ orderNumber }: Props) {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useAddPurchasePayment({ orderNumber });

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

export default AddPayment;
