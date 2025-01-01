import { useMutation } from "react-query";
import useAuthStore from "../store/auth";
import { FieldConfig } from "../types/comps";
import { App } from "antd";
import { userSignUpSchema } from "../zodSchemas/auth";
import useEnrollStore from "../store/enroll";
import { ZodError } from "zod";
import { UserSignUp } from "../types/forms";

interface UseSignUpReturn {
  handleSignUp: (values: any) => void;
  formConfig: FieldConfig[];
  isLoading: boolean;
}

const useSignUp = (): UseSignUpReturn => {
  const { signUp } = useAuthStore(); // Changed from signIn to signUp
  const { message } = App.useApp();
  const { email, role, warehouse, nextPage } = useEnrollStore();

  const formConfig: FieldConfig[] = [
    { name: "full_name", label: "Full Name", type: "text", required: true },
    { name: "password", label: "Password", type: "password", required: true },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      required: true,
      dependencies: ["password"],
      rules: [
        {
          required: true,
          message: "Please confirm your password!",
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("The new password that you entered do not match!")
            );
          },
        }),
      ],
    }, // Added confirm password field
    { name: "username", label: "Username", type: "text", required: true },
  ];

  const { mutate: handleSignUp, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        const payload: UserSignUp = {
          email: email || "",
          password: values.password,
          userData: {
            full_name: values.full_name,
            username: values.username,
            role: role || "",
            warehouse: warehouse || "",
          },
        };
        const parsedValues = await userSignUpSchema.parseAsync(payload);
        await signUp(parsedValues);
      } catch (error) {
        if (error instanceof ZodError) {
          // Handle ZodError separately to extract and display validation errors
          console.error("Zod Validation failed:", error.errors);
          throw error; // Re-throw the ZodError to be caught by the onError handler
        } else if (error instanceof Error) {
          // Handle other types of errors
          console.error("An unexpected error occurred:", error.message);
          throw new Error(error.message);
        } else {
          console.error("An unexpected error occurred:", error);
          throw new Error("An unexpected error occurred");
        }
      }
    },
    // Handle error during sign-up
    onError: (error) => {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("An unexpected error occurred");
      }
    },
    onSuccess: () => {
      message.success("Signed Up Successfully"); // Changed success message
      nextPage();
    },
  });

  return {
    formConfig,
    handleSignUp, // Changed from handleLogin to handleSignUp
    isLoading,
  };
};

export default useSignUp; // Changed from useLogin to useSignUp
