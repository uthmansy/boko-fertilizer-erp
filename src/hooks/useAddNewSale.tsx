import { FieldConfig, SelectOption } from "../types/comps";
import { App } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodError } from "zod";
import {
  addSale,
  getInventoryItems,
  getPurchaseItems,
  getWarehouses,
} from "../helpers/apiFunctions"; // Update to use addSale function
import {
  inventoryItemsKeys,
  purchasesKeys,
  warehousesKeys,
} from "../constants/QUERY_KEYS"; // Update to use salesKeys
import { CreateSaleRPCSchema } from "../zodSchemas/sales"; // Update to SalesSchema
import useSalesStore from "../store/sales";
import { PurchaseItemsJoined } from "../types/db";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

function useAddNewSale(): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

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

  const { data: warehouses } = useQuery({
    queryKey: warehousesKeys.getAllWarehouses,
    queryFn: async (): Promise<SelectOption[]> => {
      const warehouses = await getWarehouses();
      return warehouses.map((warehouse) => ({
        label: warehouse.name,
        value: warehouse.name,
      }));
    },
    onError: () => {
      message.error("Failed to Load warehouses");
    },
  });

  const { data: purchaseItems } = useQuery({
    queryKey: purchasesKeys.getAllPurchaseItems,
    queryFn: async (): Promise<PurchaseItemsJoined[]> => {
      const items = await getPurchaseItems();
      return items;
    },
    onError: () => {
      message.error("Failed to Load purchased items");
    },
  });

  const { type, isModalOpen, handleCloseModal, handleOpenModal, resetState } =
    useSalesStore();

  const formConfig: FieldConfig[] = [
    {
      name: "date",
      label: "Date",
      type: "date",
      required: true,
    },
    {
      name: "customer_name",
      label: "Customer Name",
      type: "text",
      required: true,
    },
    {
      name: "customer_phone",
      label: "Customer Phone",
      type: "text",
      required: false,
      rules: [
        {
          pattern: /^[0-9]{11}$/,
          message: "Phone Number must be 11 digits and contain numbers only",
        },
      ],
    },
    ...((type === "internal"
      ? [
          {
            name: "warehouse",
            label: "Warehouse",
            type: "select",
            options: warehouses,
            required: true,
          },
        ]
      : []) as FieldConfig[]),
    {
      name: "items",
      label: "Items",
      type: "dynamic",
      required: true,
      subFields: [
        ...((type === "internal"
          ? [
              {
                name: "item_purchased",
                label: "Item Purchased",
                type: "select",
                options: items || [],
                required: true,
              },
            ]
          : []) as FieldConfig[]),
        ...((type === "external"
          ? [
              {
                name: "purchase_item",
                label: "Item",
                type: "select",
                options:
                  purchaseItems?.map((item) => ({
                    label: `${item.item} from ${item.purchase_info.seller} - ${item.purchase_info.order_number} - ${item.balance}${item.item_info.unit} remains`,
                    value: item.id,
                  })) || [],
                required: true,
              },
            ]
          : []) as FieldConfig[]),
        {
          name: "quantity",
          label: "Quantity",
          type: "number",
          // suffix: "",
          required: true,
        },
        {
          name: "price",
          label: "Price",
          type: "money",
          required: true,
        },
        {
          name: "vat",
          label: "VAT (%)",
          type: "number",
          required: true,
          suffix: "%",
        },
      ],
    },
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        values.date = values.date.format("YYYY-MM-DD");
        values.type = type;
        // Get fresh data from cache to ensure accuracy
        const purchaseItems = await queryClient.fetchQuery(
          purchasesKeys.getAllPurchaseItems,
          getPurchaseItems
        );

        if (type === "external") {
          // Add item_purchased based on purchase_item selection
          values.items = values.items.map((item: any) => {
            const foundItem = purchaseItems.find(
              (pi) => pi.id === item.purchase_item
            );
            if (!foundItem) {
              throw new Error(
                `Selected purchase item ${item.purchase_item} not found`
              );
            }
            return {
              ...item,
              item_purchased: foundItem.item, // Set from purchase item data
            };
          });
        }
        const payload = await CreateSaleRPCSchema.parseAsync(values);
        await addSale(payload); // Use addSale function for sales
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
      if (error instanceof ZodError) {
        message.error(error.errors[0].message);
      } else if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("An unexpected error occurred");
      }
    },
    onSuccess: () => {
      message.success("Sale added successfully");
      handleCloseModal();
      resetState();
      queryClient.invalidateQueries(); // Update to use salesKeys
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

export default useAddNewSale;
