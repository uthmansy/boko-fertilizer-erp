import { Modal } from "antd";
import FormBuilder from "../../utils/FormBuilder";
import { FormInstance } from "antd/lib";
import useAddNewCustomer from "../../../hooks/useAddNewCustomer";

interface Props {
  isAddCustomerOpen: boolean;
  handleCloseAddCusomter: () => void;
  form: FormInstance<any>;
}

function AddNewCustomer({
  isAddCustomerOpen,
  handleCloseAddCusomter,
  form,
}: Props) {
  const { formConfig, handleSubmit, isLoading } = useAddNewCustomer({
    form,
    handleCloseAddCusomter,
  });

  return (
    <>
      {/* <Button className="uppercase" onClick={handleOpenModal} type="default">
        + Add New
      </Button> */}
      <Modal
        footer={null}
        title="Add New Customer"
        open={isAddCustomerOpen}
        onCancel={handleCloseAddCusomter}
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

export default AddNewCustomer;
