import { Button, Modal } from "antd";
import useAddDeduction from "../../../hooks/useAddDeduction";
import FormBuilder from "../../utils/FormBuilder";

interface Props {
  payrollId: string;
}

function AddDeduction({ payrollId }: Props) {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useAddDeduction({
    payrollId,
  });

  return (
    <>
      <Button className="uppercase" onClick={handleOpenModal} type="default">
        + Add Deduction
      </Button>
      <Modal
        footer={null}
        title="Add Deduction"
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

export default AddDeduction;
