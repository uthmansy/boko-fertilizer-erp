import useDispatchForm from "../../../hooks/useDispatchForm";
import FormBuilder from "../../utils/FormBuilder";

function DispatchForm() {
  const { formConfig, handleSubmit, isLoading } = useDispatchForm();

  return (
    <FormBuilder
      formConfig={formConfig}
      onSubmit={handleSubmit}
      loading={isLoading}
      columns={2}
    />
  );
}

export default DispatchForm;
