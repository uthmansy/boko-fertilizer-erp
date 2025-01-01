import { useMutation, useQueryClient } from "react-query";
import useAuthStore from "../store/auth";
import { FieldConfig } from "../types/comps";
import { useNavigate } from "react-router-dom";
import { App } from "antd";
import { useEffect } from "react";

interface UseLoginReturn {
  handleLogin: (values: any) => void;
  formConfig: FieldConfig[];
  isLoading: boolean;
}

const useLogin = (): UseLoginReturn => {
  const { signIn } = useAuthStore();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries();
  }, []);

  const formConfig: FieldConfig[] = [
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
  ];

  const { mutate: handleLogin, isLoading } = useMutation({
    // API function for login
    mutationFn: async (values: any) => {
      await signIn(values);
    },
    // Handle error during login
    onError: (error) => {
      message.error(error as string);
    },
    onSuccess: () => {
      message.success("Logged In Successfully");
      navigate("..");
    },
  });

  return {
    formConfig,
    handleLogin,
    isLoading,
  };
};

export default useLogin;
