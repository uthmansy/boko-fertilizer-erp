import useEditSale from "../../../hooks/useEditSale";
import FormBuilder from "../../utils/FormBuilder";
import { SalesAndPayments } from "../../../types/db";
import { MdModeEdit } from "react-icons/md";
import { Button, Modal } from "antd";
import AddNewCustomer from "../customers/AddNewCustomer";

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
    form,
    handleCloseAddCusomter,
    isAddCustomerOpen,
  } = useEditSale({ sale });

  return (
    <>
      <Button onClick={handleOpenModal} type="default" icon={<MdModeEdit />} />
      <Modal
        footer={null}
        title="Edit Sale"
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={500}
      >
        <AddNewCustomer
          isAddCustomerOpen={isAddCustomerOpen}
          handleCloseAddCusomter={handleCloseAddCusomter}
          form={form}
        />
        <FormBuilder
          formConfig={formConfig}
          onSubmit={handleSubmit}
          loading={isLoading}
          columns={1}
          form={form}
        />
      </Modal>
    </>
  );
}

export default EditSale;
