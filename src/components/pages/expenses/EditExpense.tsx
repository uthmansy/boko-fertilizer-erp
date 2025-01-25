import { Button, Modal } from "antd";
import useEditExpense from "../../../hooks/useEditExpense";
import FormBuilder from "../../utils/FormBuilder";
import { Expenses } from "../../../types/db";
import { MdModeEdit } from "react-icons/md";

interface Props {
  expense: Expenses;
}

function EditExpense({ expense }: Props) {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useEditExpense({ expense });

  return (
    <>
      <Button onClick={handleOpenModal} type="default">
        <MdModeEdit />
      </Button>
      <Modal
        footer={null}
        title="Edit Expense"
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

export default EditExpense;
