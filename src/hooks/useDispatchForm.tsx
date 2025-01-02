import { FieldConfig, SelectOption } from "../types/comps";
import { App } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodError } from "zod";
import {
  addNewVehicle,
  getAllInternalStocks,
  getAllUncompletedSales,
  getDestinationStockId,
  getExternalStocks,
  getUncompletedInventoryTransfers,
  getWarehouses,
} from "../helpers/apiFunctions";
import {
  externalStocksKeys,
  inventoryTransfersKeys,
  salesKeys,
  stocksKeys,
  warehousesKeys,
} from "../constants/QUERY_KEYS";

import {
  InventoryTransferWithStocks,
  Sales,
  Stocks,
  StocksWithSoldBalance,
} from "../types/db";
import DispatchSchema from "../zodSchemas/dispatch";
import useDispatchStore from "../store/dispatch";
import useAuthStore from "../store/auth";
import { STATES } from "../constants/ENUMS";
import { useEffect, useState } from "react";

interface HookReturn {
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

function useDispatchForm(): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const { fromExternalStock, toCustomer, setNewDispatchVehicle, nextPage } =
    useDispatchStore();
  const { userProfile } = useAuthStore();

  const { data: destinations } = useQuery({
    queryKey: warehousesKeys.getDispatchWarehouses,
    queryFn: async (): Promise<SelectOption[]> => {
      const warehouses = await getWarehouses();
      return warehouses.map((warehouse) => ({
        label: warehouse.name,
        value: warehouse.name,
      }));
    },
    onError: () => {
      message.error("Failed to Load Inventory warehouses");
    },
  });

  const { data: saleOrders } = useQuery({
    queryKey: salesKeys.getUncompletedSales,
    queryFn: async (): Promise<Sales[]> => {
      const orders = await getAllUncompletedSales();
      return orders;
    },
    onError: () => {
      message.error("Failed to Load Inventory warehouses");
    },
  });

  const { data: transferOrders } = useQuery({
    queryKey: inventoryTransfersKeys.getAllInventoryTransfers,
    queryFn: async (): Promise<InventoryTransferWithStocks[]> => {
      const orders = await getUncompletedInventoryTransfers();
      return orders;
    },
    onError: () => {
      message.error("Failed to Load Inventory Transfers");
    },
  });

  const { data: internalStocks } = useQuery({
    queryKey: stocksKeys.getInternalStocks,
    queryFn: async (): Promise<Stocks[]> => {
      const stocks = await getAllInternalStocks();
      return stocks;
    },
    onError: () => {
      message.error("Failed to Load Inventory");
    },
  });

  const [saleOrderOptions, setSaleOrderOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    const filteredOrders = fromExternalStock
      ? saleOrders?.filter((order) => order.type === "external")
      : saleOrders?.filter((order) => {
          if (userProfile?.warehouse) {
            return (
              order.type === "internal" &&
              order.warehouse === userProfile.warehouse
            );
          } else {
            return order.type === "internal";
          }
        });

    setSaleOrderOptions(
      filteredOrders?.map((order) => ({
        label: `${order.customer_name} - ${order.item_purchased} - ${order.balance} remain`,
        value: order.order_number,
      })) || []
    );
  }, [saleOrders]);

  const { data: origins } = useQuery({
    queryKey: externalStocksKeys.getItemExternalRecord,
    queryFn: async (): Promise<StocksWithSoldBalance[]> => {
      const stocks = await getExternalStocks();
      const stocksWithSoldBalance: StocksWithSoldBalance[] = stocks
        .map((stock) => {
          const totalSoldBalance = stock.sales.reduce(
            (sum, sale) => sum + sale.balance,
            0
          );
          return {
            ...stock,
            totalSoldBalance,
          };
        })
        .filter((stock) => stock.balance > stock.totalSoldBalance);
      return stocksWithSoldBalance;
    },
    onError: () => {
      message.error("Failed to Load Inventory Stocks");
    },
  });

  const originOptions: SelectOption[] =
    origins?.map((stock) => ({
      label: `${stock.stock_purchases.item} / ${
        stock.stock_purchases.seller
      } (${
        toCustomer ? stock.balance : stock.balance - stock.totalSoldBalance
      }  Available)`,
      value: stock.id,
    })) || [];

  const formConfig: FieldConfig[] = [
    ...((!fromExternalStock && !toCustomer
      ? [
          {
            name: "inventory_transfer_id",
            label: "Inventory Transfer Order",
            type: "select",
            options:
              transferOrders?.map((order) => ({
                label: `${order.quantity}  ${order.item} to ${order.destinationStock.warehouse}`,
                value: order.id,
              })) || [],
            required: true,
          },
        ]
      : []) as FieldConfig[]),
    ...((fromExternalStock && toCustomer === false
      ? [
          {
            name: "destination",
            label: "Destination",
            type: "select",
            options: destinations || [],
            required: true,
          },
        ]
      : []) as FieldConfig[]),
    ...((toCustomer === true
      ? [
          {
            name: "sale_order_number",
            label: "Sale Order",
            type: "select",
            options: saleOrderOptions || [],
            required: true,
          },
        ]
      : []) as FieldConfig[]),
    ...((toCustomer === true
      ? [
          {
            name: "destination_address",
            label: "Destination",
            type: "text",
            required: false,
          },
        ]
      : []) as FieldConfig[]),
    {
      name: "date_dispatched",
      label: "Date",
      type: "date",
      required: true,
    },
    {
      name: "origin_state",
      label: "State",
      type: "select",
      options: STATES.map((state) => ({
        label: state.charAt(0).toUpperCase() + state.slice(1).toLowerCase(),
        value: state,
      })),
      required: true,
    },
    {
      name: "driver_name",
      label: "Driver Name",
      type: "text",
      required: true,
    },
    {
      name: "driver_number",
      label: "Driver Number",
      type: "text",
      required: true,
      rules: [
        {
          pattern: /^[0-9]{11}$/,
          message: "Phone Number must be 11 digits and contain numbers only",
        },
      ],
    },
    ...((fromExternalStock
      ? [
          {
            name: "external_origin_id",
            label: "Origin",
            type: "select",
            options: originOptions,
            required: true,
          },
        ]
      : []) as FieldConfig[]),
    ...((fromExternalStock && toCustomer === false
      ? [
          {
            name: "item",
            label: "Item",
            type: "text",
            required: true,
            dependencies: ["external_origin_id"],
            getValueFromDependency: (values) => {
              const stock = origins?.find(
                (origin) => origin.id === values?.external_origin_id
              )?.stock_purchases.item;

              return stock;
            },
          },
        ]
      : []) as FieldConfig[]),
    ...((fromExternalStock && toCustomer === false
      ? [
          {
            name: "other_waybill_number",
            label: "Other Waybill Number",
            type: "text",
            required: false,
          },
        ]
      : []) as FieldConfig[]),
    {
      name: "qty_carried",
      label: "Quantity Carried",
      type: "number",
      suffix: "",
      required: true,
      dependencies: [
        "sale_order_number",
        "external_origin_id",
        "inventory_transfer_id",
      ],
      getMaxFromDependency: (values) => {
        const origin = origins?.find(
          (origin) => origin.id === values?.external_origin_id
        );
        const saleOrder = saleOrders?.find(
          (order) => order.order_number === values?.sale_order_number
        );
        const transferOrder = transferOrders?.find(
          (order) => order.id === values?.inventory_transfer_id
        );
        const balance = origin && origin.balance - origin.totalSoldBalance;
        const customerBalance = saleOrder && saleOrder.balance;
        const transferOrderBalance = transferOrder && transferOrder.balance;

        if (!toCustomer && !fromExternalStock) {
          return transferOrderBalance;
        } else if (toCustomer) {
          // Return the smaller value between customerBalance and balance
          return Math.min(
            customerBalance || Infinity,
            origin?.balance || Infinity,
            transferOrderBalance || Infinity
          );
        }

        return balance;
      },
    },
    {
      name: "transporter",
      label: "Transporter",
      type: "text",
      required: false,
    },
    {
      name: "transport_fee",
      label: "Transport Fee",
      type: "money",
      required: false,
    },
    {
      name: "paid_on_dispatch",
      label: "Transport Fee Paid",
      type: "money",
      required: false,
    },
    {
      name: "vehicle_number",
      label: "Vehicle Number",
      type: "text",
      required: true,
      // rules: [
      //   {
      //     pattern: /^[A-Z]{3}-\d{3}[A-Z]{2}$/,
      //     message:
      //       "Invalid vehicle number format. It should be in the format ABC-123DE and UPPERCASE",
      //   },
      // ],
    },
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        if (values.destination)
          values.destination = await getDestinationStockId(
            values.item,
            values.destination
          );
        values.date_dispatched = values.date_dispatched.format("YYYY-MM-DD");
        values.dispatched_by = userProfile?.username;
        values.from_external_stock = fromExternalStock;
        values.to_customer = toCustomer;
        values.status = toCustomer ? "delivered" : "dispatched";
        values.type = toCustomer ? "sale" : "normal";
        if (!toCustomer && !fromExternalStock) {
          const order = transferOrders?.find(
            (order) => order.id === values.inventory_transfer_id
          );
          values.is_inventory_transfer = true;
          values.item = order?.item;
          values.destination = order?.destination_stock_id;
        } else {
          values.is_inventory_transfer = false;
        }

        if (toCustomer) {
          const saleOrder = saleOrders?.find(
            (order) => order.order_number === values.sale_order_number
          );
          values.item = saleOrder?.item_purchased;
          values.destination = undefined;
          const isCorrectItem =
            values.external_origin_id === saleOrder?.external_stock;
          if (fromExternalStock && !isCorrectItem)
            throw new Error(
              "Wrong Item for Customer, please Select Appropriate Origin Stock"
            );
        }
        values.origin_stock_id =
          internalStocks?.find(
            (stock) =>
              stock.warehouse === userProfile?.warehouse &&
              stock.item === values.item
          )?.id || undefined;
        await DispatchSchema.parseAsync(values);
        const vehicle = await addNewVehicle(values);
        setNewDispatchVehicle(vehicle);
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
      message.success("Dispatched successfully");
      queryClient.invalidateQueries();
    },
  });

  return {
    formConfig,
    handleSubmit,
    isLoading,
  };
}

export default useDispatchForm;
