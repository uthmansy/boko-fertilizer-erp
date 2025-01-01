import useSignUp from "../../../hooks/useSignUp"; // Changed from useLogin to useSignUp
import FormBuilder from "../../utils/FormBuilder";

const SignUp = () => {
  const { formConfig, handleSignUp, isLoading } = useSignUp(); // Changed handleLogin to handleSignUp

  return (
    <>
      <h1 className="mb-5 text-center uppercase font-bold">Sign Up</h1>{" "}
      {/* Changed title from Login to Sign Up */}
      <FormBuilder
        formConfig={formConfig}
        onSubmit={handleSignUp} // Changed from handleLogin to handleSignUp
        loading={isLoading}
        fullWidthButton={true}
      />
    </>
  );
};

export default SignUp; // Changed from Login to SignUp
