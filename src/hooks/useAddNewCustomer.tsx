import { FieldConfig } from "../types/comps";
import { App, FormInstance } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { addCustomer } from "../helpers/apiFunctions";
import { AddCustomerSchema } from "../zodSchemas/customers";

interface HookReturn {
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

interface Props {
  form: FormInstance<any>;
  handleCloseAddCusomter: () => void;
}

function useAddNewCustomer({
  form,
  handleCloseAddCusomter,
}: Props): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const formConfig: FieldConfig[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "phone",
      label: "Phone",
      type: "text",
      required: false,
      rules: [
        {
          pattern: /^[0-9]{11}$/,
          message: "Phone Number must be 11 digits and contain numbers only",
        },
      ],
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      required: false,
      rules: [
        {
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Please enter a valid email address",
        },
      ],
    },
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        const payload = await AddCustomerSchema.parseAsync(values);
        const customer = await addCustomer(payload);
        return customer;
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
    onSuccess: (data) => {
      message.success("added successfully");
      handleCloseAddCusomter();
      queryClient
        .invalidateQueries()
        .finally(() => form.setFieldsValue({ customer_id: data?.id }));
    },
  });

  return {
    formConfig,
    handleSubmit,
    isLoading,
  };
}

export default useAddNewCustomer;
