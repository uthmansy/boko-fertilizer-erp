import useEditSale from "../../../hooks/useEditSale";
import FormBuilder from "../../utils/FormBuilder";
import { SalesAndPayments } from "../../../types/db";
import { MdModeEdit } from "react-icons/md";
import { Button, Modal } from "antd";

interface Props {
  sale: SalesAndPayments;
}

function EditSale({ sale }: Props) {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useEditSale({ sale });

  return (
    <>
      <Button onClick={handleOpenModal} type="default" icon={<MdModeEdit />} />
      <Modal
        footer={null}
        title="Edit Sale"
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

export default EditSale;
