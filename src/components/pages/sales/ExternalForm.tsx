import useAddNewSale from "../../../hooks/useAddNewSale"; // Update import to use the hook for sales
import FormBuilder from "../../utils/FormBuilder";
import AddNewCustomer from "../customers/AddNewCustomer";

function ExternalForm() {
  const {
    formConfig,
    handleSubmit,
    isLoading,
    isAddCustomerOpen,
    handleCloseAddCusomter,
    form,
  } = useAddNewSale();

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

export default ExternalForm;
