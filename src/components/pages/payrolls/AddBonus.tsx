import { Button, Modal } from "antd";
import useAddBonus from "../../../hooks/useAddBonus";
import FormBuilder from "../../utils/FormBuilder";

interface Props {
  payrollId: string;
}

function AddBonus({ payrollId }: Props) {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useAddBonus({
    payrollId,
  });

  return (
    <>
      <Button className="uppercase" onClick={handleOpenModal} type="default">
        + Add Bonus
      </Button>
      <Modal
        footer={null}
        title="Add Bonus"
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

export default AddBonus;
