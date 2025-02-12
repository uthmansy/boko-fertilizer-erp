import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { App, DescriptionsProps } from "antd";
import { Headers } from "react-csv/lib/core";
import dayjs, { Dayjs } from "dayjs";
import {
  dailyProductionKeys,
  finishedProductsKeys,
  stocksKeys,
  warehousesKeys,
} from "../constants/QUERY_KEYS";
import {
  getDailyFinishedProducts,
  getDailyProductionSummary,
  getStockRecord,
  getWarehouses,
} from "../helpers/apiFunctions";
import useAuthStore from "../store/auth";
import {
  DailyProductionSummary,
  FinishedProductsJoint,
  FinishedProductsTableSummary,
  StocksWithDetails,
} from "../types/db";
import { FieldConfig, SelectOption } from "../types/comps";
import { formatNumber } from "../helpers/functions";

type ShiftType = "morning" | "night";

interface HookReturn {
  morningShift: DailyProductionSummary[] | undefined;
  nightShift: DailyProductionSummary[] | undefined;
  allProductsPiecesQuantityMorning: FinishedProductsTableSummary[] | undefined;
  allProductsPiecesQuantityNight: FinishedProductsTableSummary[] | undefined;
  allProductsPiecesQuantity: DailyProductionSummary[] | undefined;
  isLoading: boolean;
  isLoadingFinishedProducts: boolean;
  isRefetching: boolean;
  isRefetchingFinishedProducts: boolean;
  date: string;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  handleDate: (date: Dayjs) => void;
  handleName: (value: string) => void;
  handleWarehouse: (value: string) => void;
  totalQuantityProduced: number;
  totalQuantityProducedMorning: number;
  totalQuantityProducedNight: number;
  totalBaleQuantityProduced: number;
  totalBaleQuantityProducedMorning: number;
  totalBaleQuantityProducedNight: number;
  isLoadingSummary: boolean;
  isRefetchingSummary: boolean;
  summaryTableItems: DescriptionsProps["items"];
  names: SelectOption[];
  csvHeaders: Headers;
  csvData: Array<{ product: string; quantity: number; shift: ShiftType }>;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  isModalOpen: boolean;
  stockRecord: StocksWithDetails[] | undefined;
  warehouses: SelectOption[];
  finishedProducts: FinishedProductsJoint[] | undefined;
}

export default function useDailyProduction(): HookReturn {
  const { message } = App.useApp();
  const { userProfile } = useAuthStore();

  // State management
  const [date, setDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [name, setName] = useState<string | null>(null);
  const [warehouseFilter, setWarehouseFilter] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoized warehouse value
  const warehouse = useMemo(() => {
    if (warehouseFilter && warehouseFilter !== "all") return warehouseFilter;
    if (["ADMIN", "SUPER ADMIN"].includes(userProfile?.role ?? "")) return null;
    return userProfile?.warehouse ?? null;
  }, [warehouseFilter, userProfile]);

  // API Queries
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: [dailyProductionKeys.getDay, date, warehouse],
    queryFn: () => getDailyProductionSummary(date, warehouse),
    onError: () => message.error("Error Generating Report"),
    select: useCallback((data: DailyProductionSummary[]) => data ?? [], []),
  });

  const {
    data: finishedProducts,
    isLoading: isLoadingFinishedProducts,
    isRefetching: isRefetchingFinishedProducts,
  } = useQuery({
    queryKey: [finishedProductsKeys.getDailyProduction, date, warehouse],
    queryFn: () => getDailyFinishedProducts(date, warehouse),
    onError: () => message.error("Error Getting Finished Products Report"),
    select: useCallback((data: FinishedProductsJoint[]) => data ?? [], []),
  });

  const { data: warehouses } = useQuery({
    queryKey: warehousesKeys.getWarehouseOptions,
    queryFn: async (): Promise<SelectOption[]> => {
      const warehouses = await getWarehouses();
      return [
        { label: "All", value: "all" },
        ...(warehouses?.map((w) => ({ label: w.name, value: w.name })) ?? []),
      ];
    },
    onError: () => message.error("Failed to Load Inventory warehouses"),
  });

  const {
    data: stockRecord,
    isLoading: isLoadingSummary,
    isRefetching: isRefetchingSummary,
  } = useQuery({
    queryKey: [stocksKeys.getStockRecords, warehouse],
    queryFn: () => getStockRecord(warehouse),
    onError: () => message.error("Failed to generate summary"),
  });

  // Memoized shifts data
  const [morningShift, nightShift] = useMemo(() => {
    const filteredData =
      name && name !== "all"
        ? data?.filter((d) => d.product_info?.name === name)
        : data;

    return [
      filteredData?.filter((d) => d.shift === "morning"),
      filteredData?.filter((d) => d.shift === "night"),
    ];
  }, [data, name]);

  // Memoized product names
  const names = useMemo<SelectOption[]>(
    () => [
      { label: "All", value: "all" },
      ...Array.from(
        new Map(
          data?.map((d) => [
            d.product_info?.name,
            { label: d.product_info?.name, value: d.product_info?.name },
          ]) ?? []
        ).values()
      ),
    ],
    [data]
  );

  // Calculation utilities
  const calculatePieces = useCallback(
    (product: FinishedProductsJoint, shift: ShiftType) => {
      const production = data?.find(
        (pr) =>
          pr.product_info?.name === product.product_info?.name &&
          pr.shift === shift
      );
      return (
        (production?.total_quantity_produced ?? 0) /
        ((product.product_info?.length || 98) / 100)
      );
    },
    [data]
  );

  const calculateTotal = useCallback(
    (
      items: any[] | undefined,
      key: keyof DailyProductionSummary | keyof FinishedProductsJoint
    ) => items?.reduce((sum, item) => sum + (Number(item[key]) || 0), 0) ?? 0,
    []
  );

  // Memoized transformed data
  const allProductsPiecesQuantity = useMemo(
    () =>
      data?.map((p) => ({
        ...p,
        pieces:
          (p.total_quantity_produced ?? 0) /
          ((p.product_info?.length || 98) / 100),
      })),
    [data]
  );
  ``;

  const allProductsPiecesQuantityMorning = useMemo(
    () =>
      finishedProducts
        ?.filter((pr) => pr.shift === "morning")
        .map((product) => ({
          ...product,
          pieces: calculatePieces(product, "morning"),
          metre: data?.find(
            (pr) =>
              pr.product_info?.name === product.product_info?.name &&
              pr.shift === "morning"
          )?.total_quantity_produced,
          bales: finishedProducts
            ?.filter(
              (fp) =>
                fp.product === product.product_info?.name &&
                fp.shift === "morning"
            )
            .reduce((sum, fp) => sum + (fp.quantity_produced ?? 0), 0),
        })),
    [finishedProducts, data, calculatePieces]
  );

  const allProductsPiecesQuantityNight = useMemo(
    () =>
      finishedProducts
        ?.filter((pr) => pr.shift === "night")
        .map((product) => ({
          ...product,
          pieces: calculatePieces(product, "night"),
          metre: data?.find(
            (pr) =>
              pr.product_info?.name === product.product_info?.name &&
              pr.shift === "night"
          )?.total_quantity_produced,
          bales: finishedProducts
            ?.filter(
              (fp) =>
                fp.product === product.product_info?.name &&
                fp.shift === "night"
            )
            .reduce((sum, fp) => sum + (fp.quantity_produced ?? 0), 0),
        })),
    [finishedProducts, data, calculatePieces]
  );

  // Memoized totals
  const totalQuantityProduced = useMemo(
    () => calculateTotal(data, "total_quantity_produced"),
    [data, calculateTotal]
  );

  const totalQuantityProducedMorning = useMemo(
    () =>
      calculateTotal(
        data?.filter((p) => p.shift === "morning"),
        "total_quantity_produced"
      ),
    [data, calculateTotal]
  );

  const totalQuantityProducedNight = useMemo(
    () =>
      calculateTotal(
        data?.filter((p) => p.shift === "night"),
        "total_quantity_produced"
      ),
    [data, calculateTotal]
  );

  const totalBaleQuantityProduced = useMemo(
    () => calculateTotal(finishedProducts, "quantity_produced"),
    [finishedProducts, calculateTotal]
  );

  const totalBaleQuantityProducedMorning = useMemo(
    () =>
      calculateTotal(
        finishedProducts?.filter((fp) => fp.shift === "morning"),
        "quantity_produced"
      ),
    [finishedProducts, calculateTotal]
  );

  const totalBaleQuantityProducedNight = useMemo(
    () =>
      calculateTotal(
        finishedProducts?.filter((fp) => fp.shift === "night"),
        "quantity_produced"
      ),
    [finishedProducts, calculateTotal]
  );

  // Memoized CSV data
  const csvHeaders: Headers = useMemo(
    () => [
      { label: "Product", key: "product" },
      { label: "Quantity", key: "quantity" },
      { label: "Shift", key: "shift" },
    ],
    []
  );

  const csvData = useMemo(
    () =>
      data?.map((d) => ({
        product: d.product_info?.name ?? "Unknown",
        quantity: d.total_quantity_produced ?? 0,
        shift: d.shift,
      })) ?? [],
    [data]
  );

  // Memoized summary table
  const summaryTableItems: DescriptionsProps["items"] = useMemo(
    () =>
      stockRecord
        ?.filter((record) => record.item_info?.type === "product")
        .map((record, index) => ({
          key: index + 1,
          label: <span className="font-bold uppercase">{record.item}</span>,
          children: (
            <div className="flex">
              <span className="w-1/2">
                {formatNumber(record?.balance ?? 0)} {record?.item_info?.unit}
              </span>
              <span className="w-1/2 uppercase">{record.warehouse}</span>
            </div>
          ),
        })) ?? [],
    [stockRecord]
  );

  // Form configuration
  const formConfig: FieldConfig[] = useMemo(
    () => [
      {
        name: "date",
        label: "Date",
        type: "date",
        required: true,
      },
    ],
    []
  );

  // Event handlers
  const handleDate = useCallback(
    (date: Dayjs) => setDate(date.format("YYYY-MM-DD")),
    []
  );

  const handleSubmit = useCallback(
    (values: any) => handleDate(values.date),
    [handleDate]
  );

  const handleName = useCallback((value: string) => setName(value), []);
  const handleWarehouse = useCallback(
    (value: string) => setWarehouseFilter(value),
    []
  );

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

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
    warehouses: warehouses ?? [],
    handleWarehouse,
    totalBaleQuantityProduced,
    totalBaleQuantityProducedMorning,
    totalBaleQuantityProducedNight,
    totalQuantityProducedMorning,
    totalQuantityProducedNight,
    isLoadingFinishedProducts,
    isRefetchingFinishedProducts,
    allProductsPiecesQuantity,
    allProductsPiecesQuantityMorning,
    allProductsPiecesQuantityNight,
    finishedProducts,
  };
}
