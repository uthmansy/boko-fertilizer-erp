import { FieldConfig } from "../types/comps"; // Update import as needed
import { App } from "antd";
import { useMutation } from "react-query";
import { ZodError } from "zod";
import { verifyEmail } from "../helpers/apiFunctions"; // Update to use verifyEmail function
import useEnrollStore from "../store/enroll";

interface HookReturn {
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

function useVerifyEmail(): HookReturn {
  const { message } = App.useApp();

  // State and query management specific to email verification
  const formConfig: FieldConfig[] = [
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
      noLabel: true,
      rules: [
        {
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Please enter a valid email address",
        },
      ],
    },
  ];

  const { setEmail, setEmailVerified, setRole, setWarehouse, nextPage } =
    useEnrollStore();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        const user = await verifyEmail(values.email); // Use verifyEmail function for email verification
        if (!user) throw new Error("You are not enrolled");
        if (user.status !== "pending")
          throw new Error("You have already registered");
        setEmail(user.email);
        setRole(user.role);
        setWarehouse(user.warehouse);
        setEmailVerified(true);
        nextPage();
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
    onError: (error) => {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("An unexpected error occurred");
      }
    },
    onSuccess: () => {
      message.success("Email verified successfully");
    },
  });

  return {
    formConfig,
    handleSubmit,
    isLoading,
  };
}

export default useVerifyEmail;
