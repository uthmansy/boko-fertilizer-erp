import { useQuery } from "react-query";
import {
  dailyProductionKeys,
  stocksKeys,
  warehousesKeys,
} from "../constants/QUERY_KEYS";
import { useEffect, useState } from "react";
import {
  getDailyProductionSummary,
  getStockRecord,
  getWarehouses,
} from "../helpers/apiFunctions";
import useAuthStore from "../store/auth";
import { App, DescriptionsProps } from "antd";
import { DailyProductionSummary, StocksWithDetails } from "../types/db";
import { FieldConfig, SelectOption } from "../types/comps";
import { formatNumber } from "../helpers/functions";
import dayjs, { Dayjs } from "dayjs";
import { Headers } from "react-csv/lib/core";

interface HookReturn {
  morningShift: DailyProductionSummary[] | undefined;
  nightShift: DailyProductionSummary[] | undefined;
  isLoading: boolean;
  isRefetching: boolean;
  date: string | null;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  handleDate: (date: Dayjs) => void;
  handleName: (value: string) => void;
  handleWarehouse: (value: string) => void;
  totalQuantityProduced: number | undefined;
  isLoadingSummary: boolean;
  isRefetchingSummary: boolean;
  summaryTableItems: DescriptionsProps["items"];
  names: SelectOption[];
  csvHeaders: Headers;
  csvData:
    | {
        product: string;
        quantity: number;
        shift: "morning" | "night";
      }[]
    | undefined;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  isModalOpen: boolean;
  stockRecord: StocksWithDetails[] | undefined;
  warehouses: SelectOption[];
}
function useDailyProduction(): HookReturn {
  const { message } = App.useApp();
  const [date, setDate] = useState<string | null>(dayjs().format("YYYY-MM-DD"));
  const [name, setName] = useState<string | null>(null);
  const [warehouseFilter, setWarehouseFilter] = useState<string | null>(null);
  const [morningShift, setMorningShift] = useState<
    DailyProductionSummary[] | undefined
  >();
  const [nightShift, setNightShift] = useState<
    DailyProductionSummary[] | undefined
  >();

  const { userProfile } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formConfig: FieldConfig[] = [
    {
      name: "date",
      label: "Date",
      type: "date",
      required: true,
    },
  ];
  const warehouse =
    warehouseFilter && warehouseFilter !== "all"
      ? warehouseFilter
      : userProfile?.role === "ADMIN" || userProfile?.role === "SUPER ADMIN"
      ? null
      : userProfile?.warehouse;

  const handleSubmit = (values: any) => {
    setDate(values.date.format("YYYY-MM-DD"));
  };
  const handleDate = (date: Dayjs) => {
    setDate(date.format("YYYY-MM-DD"));
  };
  const handleName = (value: string) => {
    setName(value);
  };
  const handleWarehouse = (value: string) => {
    setWarehouseFilter(value);
  };

  const { data, isLoading, isRefetching } = useQuery(
    [dailyProductionKeys.getDay, date, warehouseFilter],
    {
      queryFn: async () => {
        const reports = await getDailyProductionSummary(date, warehouse);
        return reports;
      },
      onError: () => {
        message.error("Error Generating Report");
      },
    }
  );

  const { data: warehouses } = useQuery({
    queryKey: warehousesKeys.getWarehouseOptions,
    queryFn: async (): Promise<SelectOption[]> => {
      const warehouses = await getWarehouses();
      return [
        { label: "All", value: "all" },
        ...((warehouses.map((warehouse) => ({
          label: warehouse.name,
          value: warehouse.name,
        })) || []) as SelectOption[]),
      ];
    },
    onError: () => {
      message.error("Failed to Load Inventory warehouses");
    },
  });

  const {
    data: stockRecord,
    isLoading: isLoadingSummary,
    isRefetching: isRefetchingSummary,
  } = useQuery({
    queryKey: [stocksKeys.getStockRecords, warehouse],
    queryFn: async (): Promise<StocksWithDetails[]> => {
      const record = await getStockRecord(warehouse);
      return record;
    },
    onError: () => {
      message.error("Failed to generate summary");
    },
  });

  const summaryTableItems: DescriptionsProps["items"] = stockRecord
    ?.filter((record) => record.item_info.type === "product")
    .map((record, index) => ({
      key: index + 1,
      label: <span className="font-bold uppercase">{record.item}</span>,
      children: (
        <div className="flex">
          <span className="w-1/2">
            {formatNumber(record?.balance || 0)} {record?.item_info.unit}
          </span>
          <span className="w-1/2 uppercase">{record.warehouse}</span>
        </div>
      ),
    }));

  useEffect(() => {
    const morningShift = data?.filter((data) => data.shift === "morning");
    const nightShift = data?.filter((data) => data.shift === "night");
    setMorningShift(morningShift);
    setNightShift(nightShift);
    if (name && name !== "all") {
      setMorningShift(
        morningShift?.filter((data) => data.product_info.name === name)
      );
      setNightShift(
        nightShift?.filter((data) => data.product_info.name === name)
      );
    }
  }, [data, name]);

  const names: SelectOption[] = [
    { label: "All", value: "all" },
    ...((data
      ?.map((data) => ({
        label: data.product_info.name,
        value: data.product_info.name,
      }))
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.value === item.value)
      ) || []) as SelectOption[]),
  ];

  const totalQuantityProduced =
    (data?.reduce(
      (sum, production) => sum + production.total_quantity_produced,
      0
    ) || 0) / 500;

  const csvHeaders: Headers = [
    { label: "Product", key: "product" },
    { label: "Quantity", key: "quantity" },
    { label: "Shift", key: "shift" },
  ];

  const csvData = data?.map((data) => ({
    product: data.product_info.name,
    quantity: data.total_quantity_produced,
    shift: data.shift,
  }));

  return {
    morningShift,
    nightShift,
    isLoading,
    isRefetching,
    date,
    formConfig,
    handleSubmit,
    totalQuantityProduced,
    isLoadingSummary,
    isRefetchingSummary,
    summaryTableItems,
    handleDate,
    names,
    handleName,
    csvHeaders,
    csvData,
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    stockRecord,
    warehouses: warehouses || [],
    handleWarehouse,
  };
}

export default useDailyProduction;
