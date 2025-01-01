import useVerifyEmail from "../../../hooks/useVerifyEmail"; // Update import to use the hook for email verification
import FormBuilder from "../../utils/FormBuilder";

function VerifyEmail() {
  // Renamed component for email verification
  const { formConfig, handleSubmit, isLoading } = useVerifyEmail(); // Use hook for verifying email

  return (
    <FormBuilder
      formConfig={formConfig}
      onSubmit={handleSubmit}
      loading={isLoading}
      fullWidthButton={true}
    />
  );
}

export default VerifyEmail;
