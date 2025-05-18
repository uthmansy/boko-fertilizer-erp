import { useState } from "react";
import { FieldConfig, SelectOption } from "../types/comps";
import { App, Form, FormInstance } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { UpdateSaleSchema } from "../zodSchemas/sales";
import { getAllCustomers, updateSale } from "../helpers/apiFunctions";
import { SalesAndPayments } from "../types/db";
import dayjs from "dayjs";
import { valueType } from "antd/es/statistic/utils";
import { customersKeys } from "../constants/QUERY_KEYS";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
  isAddCustomerOpen: boolean;
  handleOpenAddCusomter: () => void;
  handleCloseAddCusomter: () => void;
  form: FormInstance<any>;
}

interface Prop {
  sale: SalesAndPayments;
}

function useEditSale({ sale }: Prop): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState<boolean>(false);
  const handleOpenAddCusomter = () => {
    setIsAddCustomerOpen(true);
  };
  const handleCloseAddCusomter = () => {
    setIsAddCustomerOpen(false);
  };

  const { data: customers = [] } = useQuery({
    queryKey: customersKeys.getAllCustomers,
    queryFn: async () => {
      const data = await getAllCustomers();
      return data;
    },
    onError: () => message.error("Failed to load customers"),
  });

  const customerOptions: SelectOption[] = customers.map((customer) => ({
    label: customer.name,
    value: customer.id,
  }));

  const formConfig: FieldConfig[] = [
    {
      name: "date",
      label: "Sale Date",
      type: "date",
      required: false,
      defaultValue: (dayjs(sale.date, "YYYY-MM-DD") ||
        undefined) as unknown as valueType,
    },
    {
      name: "customer_id",
      label: "Customer",
      type: "select",
      defaultValue: sale.customer_id,
      options: [
        { label: "-- Add New --", value: "add_new" },
        ...customerOptions,
      ],
      required: false,
      onSelect: (value) => {
        if (value === "add_new") {
          form.setFieldsValue({ customer_id: null });
          handleOpenAddCusomter();
        }
      },
    },
    // {
    //   name: "customer_phone",
    //   label: "Customer Phone",
    //   type: "text",
    //   required: false,
    //   defaultValue: sale.customer_info.phone || undefined,
    // },
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        if (values.date) values.date = values.date.format("YYYY-MM-DD");
        values.id = sale.id;
        const payload = await UpdateSaleSchema.parseAsync(values);
        await updateSale(payload);
      } catch (error) {
        if (error instanceof ZodError) {
          console.error("Validation failed:", error.errors);
          throw error;
        }
        throw new Error(
          error instanceof Error ? error.message : "Unknown error"
        );
      }
    },
    onError: (error: Error) => {
      message.error(error.message || "Failed to update sale");
    },
    onSuccess: () => {
      message.success("Sale updated successfully");
      handleCloseModal();
      queryClient.invalidateQueries();
    },
  });

  return {
    isModalOpen,
    handleCloseModal,
    handleOpenModal,
    formConfig,
    handleSubmit,
    isLoading,
    form,
    handleCloseAddCusomter,
    handleOpenAddCusomter,
    isAddCustomerOpen,
  };
}

export default useEditSale;
