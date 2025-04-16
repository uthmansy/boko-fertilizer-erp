import useEditFinishedProduct from "../../../hooks/useEditFinishedProduct";
import FormBuilder from "../../utils/FormBuilder";
import { FinishedProductsJoint } from "../../../types/db";
import { MdModeEdit } from "react-icons/md";
import { Button, Modal } from "antd";

interface Props {
  product: FinishedProductsJoint;
}

function EditFinishedProduct({ product }: Props) {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useEditFinishedProduct({ product });

  return (
    <>
      <Button onClick={handleOpenModal} type="default" icon={<MdModeEdit />} />
      <Modal
        footer={null}
        title="Edit Finished Product"
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={400}
      >
        <FormBuilder
          formConfig={formConfig}
          onSubmit={handleSubmit}
          loading={isLoading}
          columns={1}
        />
      </Modal>
    </>
  );
}

export default EditFinishedProduct;
