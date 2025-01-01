import useAddNewSale from "../../../hooks/useAddNewSale"; // Update import to use the hook for sales
import FormBuilder from "../../utils/FormBuilder";

function InternalForm() {
  const { formConfig, handleSubmit, isLoading } = useAddNewSale(); // Use hook for adding new sales

  return (
    <>
      <FormBuilder
        formConfig={formConfig}
        onSubmit={handleSubmit}
        loading={isLoading}
      />
    </>
  );
}

export default InternalForm;
