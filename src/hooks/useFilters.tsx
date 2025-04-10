// useFilters.ts
import { useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import { useQuery } from "react-query";
import { App } from "antd";
import { inventoryItemsKeys, warehousesKeys } from "../constants/QUERY_KEYS";
import { getInventoryItems, getWarehouses } from "../helpers/apiFunctions";
import { SelectOption } from "../types/comps";
import { EXPENSE_CATEGORY, MONTHS } from "../constants/ENUMS";

interface FilterState {
  searchTerm: string;
  yearFilter: number | null;
  monthFilter: number | null;
  debouncedSearchTerm: string;
  dateFilter: string | null;
  itemFilter: string | null;
  warehouseFilter: string | null;
  shiftFilter: string | null;
  expenseCategoryFilter: string | null;
}

interface FilterHandlers {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (date: Dayjs | null) => void;
  handleItemChange: (value: string | null) => void;
  handleYearChange: (value: number | null) => void;
  handleMonthChange: (value: number | null) => void;
  handleWarehouseChange: (value: string | null) => void;
  handleShiftChange: (value: string | null) => void;
  handleExpenseCategoryChange: (value: string | null) => void;
  resetFilters: () => void;
}

interface FilterOptions {
  itemOptions: SelectOption[];
  yearOptions: SelectOption[];
  monthOptions: SelectOption[];
  warehouseOptions: SelectOption[];
  shiftOptions: SelectOption[];
  expenseCategoryOptions: SelectOption[];
}

const DEBOUNCE_DELAY = 300;

function useFilters(): FilterState & FilterHandlers & FilterOptions {
  const { message } = App.useApp();
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    debouncedSearchTerm: "",
    dateFilter: null,
    itemFilter: null,
    yearFilter: null,
    monthFilter: 0,
    warehouseFilter: null,
    shiftFilter: null,
    expenseCategoryFilter: null,
  });

  // Fetch items and warehouses
  const { data: items = [] } = useQuery({
    queryKey: inventoryItemsKeys.getAllItems,
    queryFn: async () => {
      const data = await getInventoryItems();
      return data.map((item) => ({
        label: item.name,
        value: item.name,
      }));
    },
    onError: () => message.error("Failed to load inventory items"),
  });

  const { data: warehouses = [] } = useQuery({
    queryKey: warehousesKeys.getDispatchWarehouses,
    queryFn: async () => {
      const data = await getWarehouses();
      return data.map((warehouse) => ({
        label: warehouse.name,
        value: warehouse.name,
      }));
    },
    onError: () => message.error("Failed to load warehouses"),
  });

  // Options with "All" option
  const itemOptions = [{ label: "All Items", value: "" }, ...items];
  const warehouseOptions = [
    { label: "All Warehouses", value: "" },
    ...warehouses,
  ];
  const shiftOptions = [
    { label: "All Shifts", value: "" },
    { label: "Morning Shift", value: "morning" },
    { label: "Night Shift", value: "night" },
  ];
  const monthOptions: SelectOption[] = [
    { label: "All", value: 0 },
    ...MONTHS.map((month, index) => ({ label: month, value: index + 1 })),
  ];
  const yearOptions: SelectOption[] = [
    { label: "All", value: 0 },
    ...Array.from({ length: 2100 - 1900 + 1 }, (_, i) => 1900 + i).map(
      (year) => ({
        label: year.toString(),
        value: year,
      })
    ),
  ];

  // Expense category options
  const expenseCategoryOptions = [
    { label: "All Categories", value: "" },
    ...EXPENSE_CATEGORY.map((category) => ({
      label: category,
      value: category,
    })),
  ];

  // Debounce search term
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        debouncedSearchTerm: prev.searchTerm,
      }));
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [filters.searchTerm]);

  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      searchTerm: e.target.value,
    }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFilters((prev) => ({
      ...prev,
      dateFilter: date?.format("YYYY-MM-DD") ?? null,
    }));
  };

  const handleItemChange = (value: string | null) => {
    setFilters((prev) => ({
      ...prev,
      itemFilter: value || null,
    }));
  };
  const handleMonthChange = (value: number | null) => {
    setFilters((prev) => ({
      ...prev,
      monthFilter: value || null,
    }));
  };
  const handleYearChange = (value: number | null) => {
    setFilters((prev) => ({
      ...prev,
      yearFilter: value || null,
    }));
  };

  const handleWarehouseChange = (value: string | null) => {
    setFilters((prev) => ({
      ...prev,
      warehouseFilter: value || null,
    }));
  };

  const handleShiftChange = (value: string | null) => {
    setFilters((prev) => ({
      ...prev,
      shiftFilter: value || null,
    }));
  };

  const handleExpenseCategoryChange = (value: string | null) => {
    setFilters((prev) => ({
      ...prev,
      expenseCategoryFilter: value || null,
    }));
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      debouncedSearchTerm: "",
      dateFilter: null,
      itemFilter: null,
      monthFilter: null,
      yearFilter: null,
      warehouseFilter: null,
      shiftFilter: null,
      expenseCategoryFilter: null,
    });
  };

  return {
    ...filters,
    handleMonthChange,
    handleYearChange,
    monthOptions,
    yearOptions,
    itemOptions,
    warehouseOptions,
    shiftOptions,
    expenseCategoryOptions,
    handleSearchChange,
    handleDateChange,
    handleItemChange,
    handleWarehouseChange,
    handleShiftChange,
    handleExpenseCategoryChange,
    resetFilters,
  };
}

export default useFilters;
