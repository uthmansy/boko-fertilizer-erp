import useAddNewSale from "../../../hooks/useAddNewSale"; // Update import to use the hook for sales
import FormBuilder from "../../utils/FormBuilder";
import AddNewCustomer from "../customers/AddNewCustomer";

function InternalForm() {
  const {
    formConfig,
    handleSubmit,
    isLoading,
    form,
    isAddCustomerOpen,
    handleCloseAddCusomter,
  } = useAddNewSale(); // Use hook for adding new sales

  return (
    <>
      <AddNewCustomer
        isAddCustomerOpen={isAddCustomerOpen}
        handleCloseAddCusomter={handleCloseAddCusomter}
        form={form}
      />
      <FormBuilder
        form={form}
        formConfig={formConfig}
        onSubmit={handleSubmit}
        loading={isLoading}
      />
    </>
  );
}

export default InternalForm;
