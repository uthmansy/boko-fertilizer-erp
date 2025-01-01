import { useState } from "react";
import { FieldConfig, SelectOption } from "../types/comps";
import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { updateInventoryItem, uploadImage } from "../helpers/apiFunctions";

import { InventoryItems } from "../types/db";
import { INVENTORY_ITEM_TYPE } from "../constants/ENUMS";
import { UpdateInventoryItemSchema } from "../zodSchemas/inventoryItems";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

interface Prop {
  item: InventoryItems; // Assuming item is the type for an item
}

function useEditItem({ item }: Prop): HookReturn {
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

  const formConfig: FieldConfig[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: false,
      defaultValue: item.name,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: false,
      defaultValue: item.description || undefined,
    },
    {
      name: "code",
      label: "Code",
      type: "text",
      required: false,
      defaultValue: item.code,
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
      required: false,
      defaultValue: item.type,
    },
    {
      name: "unit",
      label: "Unit",
      type: "text",
      required: false,
      defaultValue: item.unit,
    },
    {
      name: "unit_price",
      label: "Price Per Item",
      type: "money",
      defaultValue: item.unit_price || undefined,
      required: false,
    },
    {
      name: "purchase_cost",
      label: "Purchase Cost",
      type: "money",
      defaultValue: item.purchase_cost || undefined,
      required: false,
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
        values.id = item.id;
        if (values.image) {
          const data = await uploadImage(values.image.file, "items");
          values.image_path = data.filePath;
          values.image_public_url = data.publicUrl;
        }
        const payload = await UpdateInventoryItemSchema.parseAsync(values);
        //@ts-ignore
        await updateInventoryItem(payload); // Ensure this function exists and takes the id
      } catch (error) {
        if (error instanceof ZodError) {
          console.error("Zod Validation failed:", error.errors);
          throw error;
        } else if (error instanceof Error) {
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
      message.success("Item updated successfully");
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

export default useEditItem;
