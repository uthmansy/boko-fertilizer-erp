import { useState } from "react";
import { FieldConfig, SelectOption } from "../types/comps";
import { INVENTORY_ITEM_TYPE } from "../constants/ENUMS";
import { App } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodError } from "zod";
import {
  addInventoryItem,
  createItemCollection,
  getInventoryItems,
  uploadImage,
} from "../helpers/apiFunctions";
import { InventoryItemSchema } from "../zodSchemas/inventoryItems";
import { inventoryItemsKeys } from "../constants/QUERY_KEYS";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

function useAddNewInventoryItem(): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const itemTypeOptions: SelectOption[] = INVENTORY_ITEM_TYPE.map((state) => ({
    value: state,
    label: state.charAt(0).toUpperCase() + state.slice(1),
  }));

  const { data: items } = useQuery({
    queryKey: inventoryItemsKeys.getAllItems,
    queryFn: async (): Promise<SelectOption[]> => {
      const items = await getInventoryItems();
      return items.map((item) => ({ label: item.name, value: item.name }));
    },
    onError: () => {
      message.error("Failed to Load Inventory Items");
    },
  });

  const formConfig: FieldConfig[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: false,
    },
    {
      name: "code",
      label: "Code",
      type: "text",
      required: true,
      rules: [
        {
          pattern: /^[A-Z0-9]{2}$/,
          message: "Code must be 2-letter uppercase or 2 integer numbers",
        },
      ],
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: itemTypeOptions,
      required: true,
    },
    {
      name: "unit",
      label: "Unit",
      type: "text",
      required: true,
    },
    {
      name: "unit_price",
      label: "Price Per Item",
      type: "money",
      required: false,
    },
    {
      name: "purchase_cost",
      label: "Purchase Cost",
      type: "money",
      required: true,
    },
    {
      name: "as_collection",
      label: "As Collection",
      type: "select",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
      required: true,
    },
    {
      name: "sub_items",
      label: "Sub Items",
      type: "dynamic",
      required: true,
      showBasedOn: { field: "as_collection", value: true },
      subFields: [
        {
          name: "item",
          label: "Item",
          type: "select",
          options: items,
          required: true,
        },
        {
          name: "quantity",
          label: "Quantity",
          type: "number",
          required: true,
        },
      ],
    },
    {
      name: "image",
      label: "Image",
      type: "image",
      required: false,
    },
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        if (values.image) {
          const data = await uploadImage(values.image.file, "items");
          values.image_path = data.filePath;
          values.image_public_url = data.publicUrl;
        }
        const payload = await InventoryItemSchema.parseAsync(values);
        if (values.as_collection) await createItemCollection(payload);
        //@ts-ignore
        else await addInventoryItem(payload);
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
      message.success("Item added successfully");
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
  };
}

export default useAddNewInventoryItem;
